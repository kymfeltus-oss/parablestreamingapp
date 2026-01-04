'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/signup')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_creator')
        .eq('id', data.user.id)
        .single()

      if (!profile?.is_creator) {
        router.push('/dashboard')
        return
      }

      setReady(true)
    })
  }, [])

  if (!ready) return null
  return <>{children}</>
}
