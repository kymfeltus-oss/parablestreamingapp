"use client";

import { useEffect, useState } from "react";
// FIX: Use a named import for the createClient function
import { createClient } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { Users, MessageSquare } from "lucide-react";

// Assuming a type for the stream data
type LiveStream = {
  id: string;
  title: string;
  creator_name: string;
  cloudflare_input_id: string;
  viewers: number;
  is_live: boolean;
};

export default function WatchStreamPage() {
  // FIX: Instantiate the client by calling the createClient function
  const supabase = createClient(); 

  const params = useParams();
  const streamId = params.id as string;

  const [stream, setStream] = useState<LiveStream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStream() {
      setLoading(true);
      const { data, error } = await supabase
        .from("live_streams")
        .select("*")
        .eq("id", streamId)
        .single();

      if (!error && data) {
        setStream(data as LiveStream);
      }
      setLoading(false);
    }
    
    if (streamId) {
        loadStream();
    }
  }, [streamId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <Navbar />
        <p className="mt-10">Loading stream details...</p>
      </div>
    );
  }

  if (!stream || !stream.is_live) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <Navbar />
        <p className="mt-10">Stream is offline or not found.</p>
      </div>
    );
  }
  
  // Assuming CF_SUBDOMAIN is available via a client-side ENV var or config
  const CF_SUBDOMAIN = process.env.NEXT_PUBLIC_CF_STREAM_SUBDOMAIN || "customer-abrj4wfwhu1pcgln.cloudflarestream.com";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Video Player & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
               {stream.cloudflare_input_id ? (
              <iframe
                src={`https://${CF_SUBDOMAIN}/${stream.cloudflare_input_id}/iframe`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                className="w-full h-full"
              />
               ) : (
                <p className="text-gray-500 flex items-center justify-center h-full">Player loading...</p>
               )}
            </div>
            
            <div>
              <h1 className="text-xl font-bold">{stream.title}</h1>
              <p className="text-sm text-gray-400">by {stream.creator_name}</p>
              <div className="flex items-center gap-2 text-xs text-[#53fc18] mt-1">
                <Users className="w-3 h-3" /> {stream.viewers} viewers
              </div>
            </div>
          </div>

          {/* Chat Sidebar (Placeholder) */}
          <div className="lg:col-span-1 bg-[#111] rounded-xl flex flex-col h-[60vh] lg:h-auto">
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#53fc18]" />
                <h2 className="text-sm font-semibold">Live Chat</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-xs text-gray-400 space-y-2">
                {/* Mock Chat Messages */}
                <p><span className="text-violet-400 font-bold">User1:</span> Amen! 🙏</p>
                <p><span className="text-blue-400 font-bold">PastorMike:</span> Welcome everyone!</p>
            </div>
            <div className="p-4 border-t border-white/10">
                <input placeholder="Say a prayer or an encouragement..." className="w-full bg-black px-3 py-2 rounded-lg text-sm" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
