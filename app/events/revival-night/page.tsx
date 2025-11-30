"use client";

import Navbar from "@/components/Navbar";

export default function RevivalNightPage() {

  const event = {
    title: "Prophetic Revival Night",
    banner: "/channels4_banner.jpg",
    video: "https://www.youtube.com/embed/edcc68JTpwc?start=3",
    host: "Pastor Mike Todd",
    date: "March 21, 2026",
    time: "7:00 PM CST",
    price: "$14.99",
    description:
      "A powerful night of worship, prophetic encounters, healing, and breakthrough."
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <div className="relative w-full h-64">
        <img src={event.banner} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute bottom-4 left-6">
          <h1 className="text-4xl font-black">{event.title}</h1>
          <p className="text-gray-300 text-sm">Hosted by {event.host}</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-10 space-y-12">

        <section>
          <div className="relative w-full pt-[56.25%] bg-black rounded-3xl border border-white/10 overflow-hidden">
            <iframe
              src={event.video}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Support This Event</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button className="bg-violet-600 hover:bg-violet-500 py-3 rounded-xl text-sm font-bold">
              🎟 Buy Ticket ({event.price})
            </button>
            <button className="bg-amber-400 hover:bg-amber-300 py-3 rounded-xl text-sm font-bold text-black">
              🌱 Sow Seeds
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-400 py-3 rounded-xl text-sm font-bold text-black">
              🙌 Tithe Now
            </button>
          </div>
        </section>

        <section className="pb-10">
          <h2 className="text-xl font-bold mb-3">About This Night</h2>
          <p className="text-gray-400">{event.description}</p>
        </section>
        
      </main>
    </div>
  );
}
