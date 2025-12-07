'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setMessage('')
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('Error: ' + error.message)
      setLoading(false)
    } else {
      setMessage('Success! Logging in...')
      router.push('/') // Redirect to home page
      router.refresh()
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage('Error: ' + error.message)
      setLoading(false)
    } else {
      setMessage('Success! Account created. You can now Sign In.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8 p-8 border border-zinc-800 rounded-xl bg-zinc-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-500">
            Welcome Back
          </h2>
          <p className="mt-2 text-zinc-400">Sign in to your Parable account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className="p-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-yellow-400">
              {message}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-600 disabled:opacity-50"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}