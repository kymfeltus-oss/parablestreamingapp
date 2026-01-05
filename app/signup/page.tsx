'use client'

import { useState } from 'react'
import { supabase } from '../../supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<string>('')
  const [busy, setBusy] = useState(false)

  const siteUrl =
    (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim()) ||
    'https://main.dqugj22h6x51v.amplifyapp.com'

  const handleSignup = async () => {
    setStatus('')
    setBusy(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/confirm`,
        },
      })

      if (error) {
        setStatus(error.message)
        alert(error.message)
        return
      }

      setStatus('Account created. Check your email to continue.')
      router.push('/login')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Create your Parable account</h1>

      <div style={{ marginTop: 16 }}>
        <input
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          style={{ width: 360, padding: 10, display: 'block', marginBottom: 10 }}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          style={{ width: 360, padding: 10, display: 'block', marginBottom: 10 }}
        />
        <button onClick={handleSignup} disabled={busy} style={{ padding: '10px 16px' }}>
          {busy ? 'Creating...' : 'Sign up'}
        </button>
      </div>

      {status ? (
        <pre style={{ marginTop: 16, whiteSpace: 'pre-wrap' }}>{status}</pre>
      ) : null}
    </div>
  )
}
