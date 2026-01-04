'use client'

import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreatorApplyPage() {
  const router = useRouter()

  const apply = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('profiles')
      .update({
        is_creator: true,
        role: 'creator'
      })
      .eq('id', user.id)

    router.push('/creator')
  }

  return (
    <div>
      <h1>Become a Creator</h1>
      <button onClick={apply}>Apply as Creator</button>
    </div>
  )
}
