// ./app/onboarding/page.tsx

'use client'

import { useState } from 'react'
// Import the new utility function from your utils folder
import { createClient } from '@/utils/supabase/client' 
import { useRouter } from 'next/navigation'

export default function OnboardingWizard() {
  // Use the utility function to instantiate the client
  const supabase = createClient()
  const router = useRouter()
  
  // ... rest of your component logic ...

  return (
    // Your component JSX
    <></>
  )
}
