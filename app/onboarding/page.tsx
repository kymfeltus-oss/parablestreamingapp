'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function OnboardingWizard() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // This holds all the strategy data
  const [formData, setFormData] = useState({
    full_name: '',
    zip_code: '',
    life_stage: '',
    primary_intent: '',
    interests: [] as string[]
  })

  // Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Selection Buttons (Vibe Check)
  const selectInterest = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(topic)
        ? prev.interests.filter(i => i !== topic) // Remove if already selected
        : [...prev.interests, topic] // Add if not
    }))
  }

  // Final Submit to Supabase
  const completeOnboarding = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          ...formData,
          marketing_opt_in: true 
        })

      if (!error) {
        router.push('/dashboard') // Send them to the main app
      } else {
        alert('Error saving profile!')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-2 rounded-full mb-8">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${step * 33}%` }}></div>
        </div>

        {/* STEP 1: THE BASICS */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Welcome to Nexus.</h2>
            <p className="text-gray-400">Let's get your profile set up.</p>
            
            <input 
              name="full_name" 
              placeholder="What should we call you?" 
              className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
              onChange={handleChange}
            />
            <input 
              name="zip_code" 
              placeholder="Zip Code (for local events)" 
              className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
              onChange={handleChange}
            />
            <button onClick={() => setStep(2)} className="w-full bg-blue-600 p-4 rounded-lg font-bold hover:bg-blue-700">
              Next
            </button>
          </div>
        )}

        {/* STEP 2: LIFE STAGE (The Advertiser Goldmine) */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Which describes you best?</h2>
            <p className="text-gray-400">We'll curate content for your season of life.</p>
            
            <div className="grid grid-cols-1 gap-3">
              {['Student / Gen Z', 'Young Professional', 'Parent / Family', 'Church Leader'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => {
                    setFormData({ ...formData, life_stage: stage })
                    setStep(3) // Auto-advance on click
                  }}
                  className="p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 text-left transition-all"
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: VIBE CHECK & TOPICS */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What are you into?</h2>
            <p className="text-gray-400">Select as many as you like.</p>
            
            <div className="flex flex-wrap gap-3">
              {['Mental Health', 'Finance', 'Relationships', 'Deep Theology', 'Worship Music', 'Politics', 'Parenting'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => selectInterest(topic)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    formData.interests.includes(topic) 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <button 
              onClick={completeOnboarding} 
              disabled={loading}
              className="w-full bg-green-600 p-4 rounded-lg font-bold hover:bg-green-700 mt-8"
            >
              {loading ? 'Building your experience...' : 'Finish Setup'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}