"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function PastorStevensonPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Navbar />

      {/* BANNER */}
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src="/steven-furtick-banner.jpg"
          alt="Pastor Stevenson Banner"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]" />
      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 flex items-end gap-6">
        <Image
          src="/steven-furtick.jpg"
          alt="Pastor Stevenson"
          width={150}
          height={150}
          className="rounded-full border-4 border-[#0a0a0a] shadow-2xl object-cover"
        />
        <div className="pb-4">
          <h1 className="text-4xl font-bold">Pastor Stevenson</h1>
          <p className="text-gray-300 mt-1">Pastor • Speaker • Leader</p>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-10">
          {/* BIO SECTION */}
          <section>
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-300 leading-relaxed">
              Pastor Stevenson is a dynamic preacher and influential spiritual
              leader known for powerful sermons, practical wisdom, and
              transformative teaching.
            </p>
          </section>

          {/* RECENT SERMON */}
          <section>
            <h2 className="text-xl font-bold mb-4">Recent Sermon</h2>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/SUAR8sMjiZc?si=r0Rn-MD3IuMab_Al"
                  title="Recent sermon by Pastor Stevenson"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-bold">“Recent Sermon”</h3>
              <p className="text-sm text-gray-400 mt-1">
                A powerful message highlighting faith, obedience, and fully
                trusting God&apos;s plan.
              </p>
            </div>
          </section>
        </div>

        {/* RIGHT — SUPPORT, MERCH, SUBSCRIBE */}
        <div className="space-y-8">
          {/* SUPPORT */}
          <div className="bg-gradient-to-br from-violet-900/40 to-black p-6 rounded-2xl border border-violet-600/30">
            <h3 className="text-lg font-bold mb-2">Partner With Stevenson</h3>
            <p className="text-sm text-gray-300 mb-4">
              Support the mission through monthly partnership and exclusive
              access.
            </p>
            <button className="w-full py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
              Give Support
            </button>
          </div>

          {/* MERCH */}
          <div>
            <h3 className="text-lg font-bold mb-4">Merch Store</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <div className="aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10 group-hover:border-violet-400 transition">
                  <Image
                    src="/steven-furtick.jpg"
                    alt="Stevenson Tee"
                    width={500}
                    height={500}
                    className="object-cover group-hover:scale-110 transition"
                  />
                </div>
                <p className="text-sm font-medium mt-2">Stevenson Tee</p>
                <p className="text-xs text-gray-400">$28</p>
              </div>

              <div className="group">
                <div className="aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10 group-hover:border-violet-400 transition">
                  <Image
                    src="/steven-furtick.jpg"
                    alt="Faith Hoodie"
                    width={500}
                    height={500}
                    className="object-cover group-hover:scale-110 transition"
                  />
                </div>
                <p className="text-sm font-medium mt-2">Faith Hoodie</p>
                <p className="text-xs text-gray-400">$55</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
