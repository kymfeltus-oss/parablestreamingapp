import Link from "next/link";
import { Creator } from "@/lib/preachers";

interface HeroSectionProps {
  creator: Creator;
}

export default function HeroSection({ creator }: HeroSectionProps) {
  const live = creator.liveStream;

  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900 via-slate-900 to-black group">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-60 group-hover:scale-105 transition duration-700"
        style={{
          backgroundImage: `url(${creator.bannerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />

      <div className="relative flex flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:gap-10 sm:px-10">
        <div className="flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Global Broadcast
          </div>

          <h1 className="mb-3 text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            {live ? live.title : creator.shortTagline}
          </h1>
          <p className="mb-6 max-w-xl text-sm text-gray-300 sm:text-base leading-relaxed">
            {creator.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {live && (
              <Link
                href="/stream" // Goes to the Stream/Sanctuary Tab
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition transform hover:scale-105"
              >
                ▶ Watch Stream
              </Link>
            )}
            
            {/* THIS LINK GOES TO THE MINISTRY PROFILE */}
            <Link
              href={`/creator/${creator.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-black transition"
            >
              View Ministry Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
