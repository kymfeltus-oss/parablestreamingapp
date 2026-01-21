"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; 
import ParableParticles from '@/components/ParableParticles';
import { Camera, Loader2 } from 'lucide-react';

const InputField = ({ name, placeholder, type = 'text', value, onChange }: any) => (
  <input 
    name={name} 
    type={type} 
    value={value || ""} 
    onChange={onChange} 
    placeholder={placeholder} 
    className="w-full bg-black border border-white/10 p-4 text-xs tracking-[2px] text-white outline-none focus:border-[#00f2ff] placeholder:text-gray-500 rounded-none appearance-none" 
  />
);

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // NEW: To store the actual file bytes

  const [formData, setFormData] = useState({
    full_name: '', 
    username: '', 
    email: '',
    password: '',
    avatar_url: '',
    role: '', 
    primary_platform: '', 
    timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
    open_to_collab: false,
    interests: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setImageFile(file); // Capture the file for upload
      setPreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, avatar_url: file.name })); 
    }
  };

  const completeOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1. Sign Up Logic
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { 
          full_name: formData.full_name, 
          username: formData.username.toLowerCase() 
        }
      }
    });

    if (authError) {
      setErrorMsg(authError.message.toUpperCase());
      setLoading(false);
      return;
    }

    if (authData.user) {
      let finalAvatarPath = null;

      // 2. NEW: Physical File Upload to Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, imageFile);

        if (!uploadError) {
          finalAvatarPath = fileName; // The path used for database reference
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      await supabase.auth.getSession();

      // 3. Profiles Upsert with the REAL avatar path
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          username: formData.username.toLowerCase(),
          email: formData.email,
          full_name: formData.full_name,
          avatar_url: finalAvatarPath, // Link the database to the storage file
          role: formData.role,
          primary_platform: formData.primary_platform,
          timezone: formData.timezone,
          open_to_collab: formData.open_to_collab,
          interests: formData.interests,
          onboarding_complete: true,
          marketing_opt_in: true 
        });

      if (!profileError) {
          router.push('/welcome?verified=false');
      } else {
          setErrorMsg(`DATABASE ERROR: ${profileError.message.toUpperCase()}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="h-[100dvh] w-full bg-black text-white relative overflow-hidden font-sans">
      <ParableParticles />
      <div className="relative z-20 h-full overflow-y-auto scrollbar-hide flex flex-col items-center">
        <form onSubmit={completeOnboarding} className="w-full max-w-md px-6 pt-12 pb-24">
          <h1 className="text-xl font-black uppercase tracking-[6px] text-[#00f2ff] text-center mb-8">CREATE ACCOUNT</h1>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#00f2ff] flex items-center justify-center overflow-hidden bg-black group-hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" /> : <Camera className="text-[#00f2ff] w-8 h-8" />}
              </div>
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
            <span className="text-[9px] text-gray-500 uppercase tracking-[2px]">SET PROFILE PHOTO</span>
          </div>
          
          <div className="space-y-4">
            <InputField name="full_name" placeholder="NAME / MINISTRY" value={formData.full_name} onChange={handleChange} />
            <InputField name="username" placeholder="USERNAME" value={formData.username} onChange={handleChange} />
            <InputField name="email" type="email" placeholder="EMAIL" value={formData.email} onChange={handleChange} />
            <InputField name="password" type="password" placeholder="PASSWORD" value={formData.password} onChange={handleChange} />

            <button type="submit" disabled={loading} className="w-full py-4 mt-6 text-xs font-bold uppercase tracking-[4px] bg-[#00f2ff] text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> SYNCING...</> : 'CREATE ACCOUNT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}