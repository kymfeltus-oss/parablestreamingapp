"use client";

import { useEffect, useState } from "react";
// FIX: Change import from named export 'supabase' to named export 'createClient'
import { createClient } from "@/lib/supabaseClient"; 
import Navbar from "@/components/Navbar";
import { Radio, Video } from "lucide-react";

export default function LivePreviewPage() {
  // FIX: Instantiate the client by calling the createClient function inside the component
  const supabase = createClient(); 

  const [stream, setStream] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creatorId, setCreatorId] = useState<string | null>(null);

  useEffect(() => {
    loadCreatorAndStream();
  }, []);

  async function loadCreatorAndStream() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    setCreatorId(userData.user.id);

    // Fetch most recent stream configuration
    const { data, error } = await supabase
      .from("live_streams")
      .select("*")
      .eq("creator_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setStream(data);
    }

    setLoading(false);
  }

  async function goLive() {
    if (!stream) return;

    const { error } = await supabase
      .from("live_streams")
      .update({ is_live: true })
      .eq("id", stream.id);

    if (error) {
      alert("Failed to go live");
      return;
    }

    // Redirect to broadcast panel
    window.location.href = "/creator/live/broadcast";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
        <p className="text-gray-400 text-sm mt-10">Loading preview...</p>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
        <p className="text-gray-400 text-sm mt-10">No stream configuration found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-12">

        <h1 className="text-4xl font-black drop-shadow-[0_0_12px_#53fc18]">
          Live Preview
        </h1>
        <p className="text-gray-400 text-sm">
          Review your stream details before going live.
        </p>

        {/* STREAM DATA CARD */}
        <div className="parable-card space-y-6">

          {/* THUMBNAIL */}
          {stream.thumbnail_url ? (
            <img
              src={stream.thumbnail_url}
              className="w-full rounded-xl border border-white/10"
            />
          ) : (
            <div className="w-full h-48 bg-[#111] rounded-xl border border-white/10 flex items-center justify-center text-gray-500">
              No Thumbnail
            </div>
          )}

          {/* TITLE */}
          <div>
            <p className="text-xs text-gray-400">Stream Title</p>
            <p className="text-lg font-bold">{stream.title}</p>
          </div>

          {/* CATEGORY */}
          <div>
            <p className="text-xs text-gray-400">Category</p>
            <p className="text-sm text-gray-300">{stream.category}</p>
          </div>

          {/* RTMP INFO */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">RTMP URL</p>
            <p className="text-sm select-all">{stream.rtmp_url}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-400">Stream Key</p>
            <p className="text-sm select-all text-[#53fc18]">
              {stream.stream_key}
            </p>
          </div>

          {/* GO LIVE BUTTON */}
          <button
            onClick={goLive}
            className="
              w-full bg-[#53fc18] text-black font-bold py-3 rounded-xl
              shadow-[0_0_12px_#53fc18] hover:brightness-110 transition
              flex items-center justify-center gap-2
            "
          >
            <Radio className="w-5 h-5" />
            Go Live Now
          </button>
        </div>

        {/* NEXT STEPS DESCRIPTION */}
        <div className="parable-card text-sm text-gray-400 leading-relaxed">
          <p>
            Once you click <span className="text-[#53fc18] font-bold">Go Live Now</span>, 
            your stream becomes active. You’ll be redirected to the broadcast page 
            where the Cloudflare live player and creator tools will appear.
          </p>
        </div>

      </main>
    </div>
  );
}
