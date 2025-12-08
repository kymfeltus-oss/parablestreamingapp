// app/login/page.tsx (Reverted to version linking to /signup)
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(`Login failed: ${signInError.message}`);
    } else {
      // Check for redirect_to parameter set by middleware
      const redirectTo = searchParams.get('redirect_to') || '/dashboard'; 
      router.push(redirectTo);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSignIn} className="p-6 border rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Log In
        </button>
        {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a> 
        </p>
      </form>
    </div>
  );
}