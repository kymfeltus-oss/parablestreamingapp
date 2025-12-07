import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // CHANGE 1: We ignore the 'next' param for now and force the Strategy Page
  // Old Code: const next = searchParams.get('next') ?? '/'
  
  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // CHANGE 2: Redirect specifically to your new wizard
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}