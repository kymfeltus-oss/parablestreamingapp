"use client";

export default function TestimoniesExplorePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-10">

        <section>
          <h1 className="text-3xl font-extrabold neon-text mb-2">
            Testimonies
          </h1>
          <p className="text-gray-400">
            Real stories of lives transformed by God.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Short Testimony */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/qjWNNGUOLE0"
              title="God transformed my wife"
              allowFullScreen
            />
            <div className="p-4">
              <p className="font-semibold">
                God Transformed My Wife 🙏
              </p>
            </div>
          </div>

          {/* Former Cop Testimony */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/WV3NQDzVINs?start=2395"
              title="Former Cop Testimony"
              allowFullScreen
            />
            <div className="p-4">
              <p className="font-semibold">
                Former Crooked Cop — Powerful Testimony
              </p>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
