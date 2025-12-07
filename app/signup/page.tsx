// app/signup/page.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const supabase = createClient();
  // useRouter is only imported for general routing capability; it's not strictly necessary here
  // const router = useRouter(); 

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // CRITICAL: This URL must point to your verification handler
        emailRedirectTo: `${window.location.origin}/auth/confirm`, 
      },
    });

    if (error) {
      setMessage(`Error signing up: ${error.message}`);
    } else {
      setMessage('Success! Check your email to verify your account.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSignUp} className="p-6 border rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Sign Up
        </button>
        {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
        <p className="mt-4 text-center">
            Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Log In</a>
        </p>
      </form>
    </div>
  );
}