// app/profile-setup/page.tsx
'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// 1. FIX: Import the actual Server Action (updateProfile)
import { updateProfile } from '@/app/actions/profile'; 

export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  // NEW: State for displaying errors from the server action
  const [error, setError] = useState<string | null>(null);

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
  
  // 2. Client-side form handler (Updated to call imported Server Action)
  // We use the 'action' attribute on the form for the cleanest Server Action call.
  // Note: We keep the separate handler here to capture errors before submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      
      const formData = new FormData(event.currentTarget);
      
      // Call the server action
      const result = await updateProfile(formData);
      
      if (result.error) {
          // Display error received from the server action
          setError(`Failed to update profile: ${result.error}`);
      }
      // CRITICAL FIX: If successful, the server action handles the redirect.
      // We do NOT use router.push('/dashboard') here.
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome! Finish Your Profile</h1>
        
        {/* NEW: Error Display */}
        {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username" // Name is CRITICAL for formData
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