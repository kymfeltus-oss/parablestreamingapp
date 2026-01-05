"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function GoLivePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [rtmpUrl, setRtmpUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to go live.");
        setLoading(false);
        return;
      }

      // Generate stream credentials
      const generatedStreamKey = crypto.randomUUID();
      const generatedRtmpUrl = "rtmp://global-live.mux.com:5222/app";

      const { error: insertError } = await supabase
        .from("live_streams")
        .insert({
          creator_id: user.id,
          stream_key: generatedStreamKey,
          rtmp_url: generatedRtmpUrl,
          is_live: false,
          streamer_name: user.user_metadata?.display_name || "Creator",
        });

      if (insertError) {
        setError("Failed to create live stream session.");
        setLoading(false);
        return;
      }

      setStreamKey(generatedStreamKey);
      setRtmpUrl(generatedRtmpUrl);
      setLoading(false);
    };

    init();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Preparing your live session…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Go Live</h1>

      <div className="bg-zinc-900 rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-2">RTMP URL</p>
        <p className="font-mono text-green-400 break-all">
          {rtmpUrl}
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-2">Stream Key</p>
        <p className="font-mono text-green-400 break-all">
          {streamKey}
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4 space-y-2">
        <p className="font-semibold">Stream from your phone</p>
        <ul className="text-sm text-gray-400 list-disc pl-5">
          <li>Install Larix Broadcaster or Streamlabs</li>
          <li>Select RTMP stream</li>
          <li>Paste the RTMP URL and Stream Key</li>
          <li>Tap Start Broadcast</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500">
        Your stream will appear live on Parable once broadcasting begins.
      </p>
    </div>
  );
}
