export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import "./globals.css";
import { Inter } from "next/font/google";
import ClientBottomNav from "./mobile-bottom-nav";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let profile = null;

  if (user) {
    // Correctly fetching username and avatar for persistence
    const { data } = await supabase
      .from('profiles')
      .select('username, avatar_url, id')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-row overflow-hidden`}>
        {/* Profile data sent to sidebar for persistent identity */}
        <Sidebar profile={profile} />
        
        <div className="flex-1 flex flex-col h-screen relative overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#050505]">
            {children}
          </div>
          <ClientBottomNav />
        </div>
      </body>
    </html>
  );
}