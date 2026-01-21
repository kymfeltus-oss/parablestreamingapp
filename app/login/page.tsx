"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import ParableParticles from "@/components/ParableParticles";
import { Lock, Mail, ChevronRight } from "lucide-react";

// Reusing the InputField component structure from the onboarding page
const InputField = ({ name, placeholder, type = 'text', value, onChange, icon: Icon }: any) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />}
    <input 
      name={name} 
      type={type} 
      value={value || ""} 
      onChange={onChange} 
      placeholder={placeholder} 
      className={`w-full bg-black border border-white/10 p-4 text-xs tracking-[2px] text-white outline-none focus:border-[#00f2ff] placeholder:text-gray-500 rounded-none appearance-none ${Icon ? 'pl-12' : ''}`} 
    />
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  async function handleLogin() {
    if (loading) return;
    setLoading(true);
    setErrorMsg(null);
    setMessage(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !data.user) {
      setErrorMsg(authError?.message || "AUTHENTICATION FAILED");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", data.user.id)
      .maybeSingle();

    setLoading(false);

    if (!profile || profile.onboarding_complete !== true) {
      router.replace("/onboarding");
      return;
    }

    router.replace("/dashboard");
  }

  async function handleResetPassword() {
    if (!email) {
        setErrorMsg("ENTER YOUR EMAIL ADDRESS FIRST.");
        return;
    }
    setResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: (process.env.NEXT_PUBLIC_SITE_URL || "https://main.dqugj22h6x51v.amplifyapp.com") + "/auth/reset",
    });
    setResetting(false);
    if (error) setErrorMsg(error.message);
    else setMessage("RESET LINK DISPATCHED. CHECK YOUR INBOX.");
  }

  return (
    // Updated container styling for consistent feel and mobile-first approach
    <div className="h-[100dvh] w-full bg-black text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParableParticles />
      </div>
      
      <div className="relative z-20 h-full overflow-y-auto scrollbar-hide flex flex-col items-center justify-center">
        {/* Form container matches the create account page's form container */}
        <div className="w-full max-w-md px-6 py-12">
          
          <div className="text-center mb-10">
            {/* Added logo placeholder/name area */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.4)] mb-6 mx-auto">
              <span className="text-2xl font-black text-[#00f2ff] tracking-tighter">P</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-[6px] text-[#00f2ff] mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-[10px] tracking-[2px] uppercase">Access the Global Gospel Nexus</p>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-[10px] text-center mb-4 tracking-[1px] uppercase">{errorMsg}</p>
          )}

          {message && (
             <p className="text-[#00f2ff] text-[10px] text-center mb-4 tracking-[1px] uppercase">{message}</p>
          )}

          <div className="space-y-4">
            <InputField 
                name="email" 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                value={email} 
                onChange={(e: any) => setEmail(e.target.value)} 
                icon={Mail}
            />

            <InputField 
                name="password" 
                type="password" 
                placeholder="PASSWORD" 
                value={password} 
                onChange={(e: any) => setPassword(e.target.value)} 
                icon={Lock}
            />

            <button 
              onClick={handleLogin} 
              disabled={loading} 
              // Updated button styling to match create account page exactly
              className="w-full py-4 mt-2 text-xs font-bold uppercase tracking-[4px] bg-[#00f2ff] text-black disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {loading ? "INITIALIZING..." : "ENTER HUB"} <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={handleResetPassword} 
                disabled={resetting}
                className="text-[9px] uppercase tracking-[1px] text-gray-500 hover:text-[#00f2ff] transition-colors"
              >
                {resetting ? "SENDING..." : "FORGOT CREDENTIALS?"}
              </button>
              
              <a 
                href="/onboarding" 
                className="text-[9px] uppercase tracking-[1px] text-[#00f2ff] font-bold hover:underline"
              >
                CREATE NEW IDENTITY
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
