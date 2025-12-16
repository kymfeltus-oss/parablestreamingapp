"use client";

export default function WorshipExplorePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-10">

        <section>
          <h1 className="text-3xl font-extrabold neon-text mb-2">
            Worship
          </h1>
          <p className="text-gray-400">
            Powerful worship moments lifting hearts and spirits.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Tasha Cobbs */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/AzZC3EbH6iE?start=4"
              title="Gracefully Broken"
              allowFullScreen
            />
            <div className="p-4">
              <p className="font-semibold">
                Tasha Cobbs Leonard — Gracefully Broken
              </p>
            </div>
          </div>

          {/* Aware Worship */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/5_iob6lOUOI?start=4"
              title="Trust In God"
              allowFullScreen
            />
            <div className="p-4">
              <p className="font-semibold">
                Aware Worship — Trust In God
              </p>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
