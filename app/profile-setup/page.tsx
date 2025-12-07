// app/profile-setup/page.tsx
'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define the Server Action for submission (you'll need to create this action later)
async function updateProfile(formData: FormData) {
  // NOTE: We will assume this Server Action is defined in a separate file (e.g., /actions/profile.ts)
  // For now, let's keep the client-side logic focused on the form.
  console.log('Sending profile data to server...');
  
  // *** Placeholder for the actual Server Action ***
  // You would call your server action here: 
  // const result = await YOUR_SERVER_ACTION(formData); 
  // 
  // Since I can't write that file yet, we'll simulate the redirect
  return { success: true };
}


export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Check current session/user status
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Optional: Check if profile already exists and redirect if necessary
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (profile?.username) {
          router.replace('/dashboard'); // Already set up, skip onboarding
        }
      } else {
        router.replace('/login'); // Not logged in
      }
      setLoading(false);
    }
    getUser();
  }, [router, supabase]);

  if (loading || !userId) {
    return <div className="p-8">Loading profile check...</div>;
  }
  
  // 2. Client-side form handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      const formData = new FormData(event.currentTarget);
      
      // Call the server action
      const result = await updateProfile(formData);
      
      if (result.success) {
          router.push('/dashboard'); // Redirect on success
      } else {
          // Handle error display
          alert('Failed to update profile. Try a different username.');
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome! Finish Your Profile</h1>
        <form onSubmit={handleSubmit}>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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