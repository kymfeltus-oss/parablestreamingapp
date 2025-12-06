"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { Radio, Users } from "lucide-react";

type LiveStream = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  rtmp_url: string | null;
  stream_key: string | null;
  cloudflare_input_id: string | null;
  is_live: boolean;
  creator_id: string;
};

export default function ViewerWatchPage() {
  const params = useParams();
  const id = params.id as string;

  const [stream, setStream] = useState<LiveStream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStream();
  }, []);

  async function loadStream() {
    setLoading(true);

    const { data, error } = await supabase
      .from("live_streams")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      setStream(data as LiveStream);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
        <p className="text-gray-400 text-sm mt-10">Loading stream...</p>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
        <p className="text-gray-500 text-sm mt-10">Stream not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 space-y-12">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-black">{stream.title}</h1>
          <p className="text-sm text-gray-400">{stream.category}</p>

          <div className="flex items-center gap-4 mt-2">
            {stream.is_live ? (
              <span className="bg-red-600 px-3 py-1 text-xs font-bold uppercase rounded-lg tracking-wide animate-pulse">
                LIVE NOW
              </span>
            ) : (
              <span className="bg-gray-700 px-3 py-1 text-xs font-bold uppercase rounded-lg tracking-wide">
                OFFLINE
              </span>
            )}

            {/* viewer badge placeholder */}
            <span className="flex items-center gap-1 text-xs text-gray-300">
              <Users className="w-3 h-3" /> 120 watching
            </span>
          </div>
        </header>

        {/* LIVE PLAYER */}
        <section className="aspect-video bg-black border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
          {stream.cloudflare_input_id ? (
            <iframe
              src={`https://iframe.videodelivery.net/${stream.cloudflare_input_id}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <p className="text-gray-500 text-sm">
              Stream is not configured for playback yet.
            </p>
          )}
        </section>

        {/* ABOUT STREAM */}
        <section className="parable-card space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#53fc18]" />
            About this stream
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            {stream.is_live
              ? "This livestream is currently active. Stay tuned for powerful gospel content, worship, and teaching."
              : "This stream is not live yet. Check back soon!"}
          </p>
        </section>
      </main>
    </div>
  );
}
