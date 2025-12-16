"use client";

export default function TeachingExplorePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-10">

        <section>
          <h1 className="text-3xl font-extrabold neon-text mb-2">
            Teaching
          </h1>
          <p className="text-gray-400">
            Deep teachings to grow your faith and understanding.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Priscilla Shirer */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/B5zYZ8v2-Ng?start=3"
              title="Hear from God"
              allowFullScreen
            />
            <div className="p-4">
              <p className="font-semibold">
                Priscilla Shirer — Hearing from God
              </p>
            </div>
          </div>

          {/* Myles Munroe */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/GrzeDNU8rds?start=4"
              title="Kingdom of God"
              allowFullScreen
            />
            <div className="p-4">
              <p className="font-semibold">
                Dr. Myles Munroe — Kingdom of God (Part 1)
              </p>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
