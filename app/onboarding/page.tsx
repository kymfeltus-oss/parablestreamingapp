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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    full_name: '', username: '', email: '', password: '',
    role: '', primary_platform: '', timezone: 'UTC'
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
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

      // 2. Physical File Upload
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        const { error: upErr } = await supabase.storage.from('avatars').upload(fileName, imageFile);
        if (!upErr) finalAvatarPath = fileName;
      }

      // 3. THE CRITICAL SESSION FIX
      // Force the cloud to recognize the new session before redirecting
      await supabase.auth.refreshSession();

      // 4. Profiles Upsert
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          username: formData.username.toLowerCase(),
          email: formData.email,
          full_name: formData.full_name,
          avatar_url: finalAvatarPath,
          onboarding_complete: true
        });

      if (!profileError) {
          router.push('/feed'); 
      } else {
          setErrorMsg(`DATABASE ERROR: ${profileError.message.toUpperCase()}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="h-[100dvh] w-full bg-black text-white relative overflow-hidden font-sans">
      <ParableParticles />
      <div className="relative z-20 h-full overflow-y-auto flex flex-col items-center">
        <form onSubmit={completeOnboarding} className="w-full max-w-md px-6 pt-12 pb-24">
          <h1 className="text-xl font-black uppercase tracking-[6px] text-[#00f2ff] text-center mb-8">IDENTITY_SYNC</h1>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#00f2ff] flex items-center justify-center overflow-hidden bg-black shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Camera className="text-[#00f2ff] w-8 h-8" />}
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

            {errorMsg && <p className="text-red-500 text-[10px] text-center font-bold tracking-widest">{errorMsg}</p>}

            <button type="submit" disabled={loading} className="w-full py-4 bg-[#00f2ff] text-black text-xs font-black uppercase tracking-[4px] hover:shadow-[0_0_20px_#00f2ff]">
              {loading ? <div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> SYNCING...</div> : 'INITIALIZE_ACCOUNT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}