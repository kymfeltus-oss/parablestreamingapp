// app/auth/landing/page.tsx
'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLandingPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // This function checks the session and immediately redirects.
    async function checkSessionAndRedirect() {
      // The delay helps ensure the session cookie is written and recognized by the browser.
      // A small delay is a common pattern to stabilize the state in a client component.
      await new Promise(resolve => setTimeout(resolve, 50)); 
      
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Successful login confirmed: send to profile setup
        router.replace('/profile-setup');
      } else {
        // If no user is found after the code exchange, something went wrong, 
        // redirect to login with an error message.
        router.replace('/login?error=session_failed_to_stabilize');
      }
    }

    checkSessionAndRedirect();
  }, [router, supabase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-3">Verification Complete</h1>
      <p className="text-gray-600">Redirecting you now...</p>
      {/* Optional: Add a spinner or loading component */}
    </div>
  );
}