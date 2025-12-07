// app/profile-setup/page.tsx
'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { updateProfile } from '@/app/actions/profile'; 
import { Camera, User as UserIcon } from 'lucide-react'; 

export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // States for Image Handling
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Check if profile already exists—this is CRITICAL
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (profile?.username) {
          router.replace('/dashboard'); 
        }
      } else {
        router.replace('/login'); // If somehow logged out, redirect
      }
      setLoading(false);
    }
    getUser();
  }, [router, supabase]);

  // Handles file selection and creates a local preview (fixes your image issue)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    if (file) {
      setAvatarFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setAvatarPreviewUrl(newPreviewUrl);
    } else {
      setAvatarFile(null);
      setAvatarPreviewUrl(null);
    }
  };

  // Client-side form handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      
      const formData = new FormData(event.currentTarget);
      
      // Append the avatar file if one was selected
      if (avatarFile) {
        formData.append('avatar', avatarFile); 
      }
      
      // Call the Server Action
      const result = await updateProfile(formData);
      
      if (result.error) {
          setError(`Failed to create profile: ${result.error}`);
      }
      // Success redirect is handled by the Server Action itself
  };

  if (loading || !userId) {
    return <div className="p-8">Loading profile check...</div>;
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome! Finish Your Profile</h1>
        
        {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* IMAGE UPLOAD SECTION */}
          <div className="mb-6 flex justify-center">
            <label htmlFor="avatar-upload" className="cursor-pointer relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-indigo-400/80">
                {avatarPreviewUrl ? (
                  <img src={avatarPreviewUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 text-gray-500" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <input
                type="file"
                id="avatar-upload"
                name="avatar-file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* USERNAME INPUT SECTION */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-800"
              placeholder="Choose a unique name"
              minLength={3}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-150"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}