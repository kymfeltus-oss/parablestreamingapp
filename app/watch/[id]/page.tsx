import Navbar from "@/components/Navbar";

export default function WatchPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: VIDEO PLAYER AREA */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative">

          <div className="text-center p-10 w-full max-w-5xl mx-auto">

            <h2 className="text-2xl font-bold mb-2">Live Stream Simulator</h2>
            <p className="text-gray-400 mb-6">Video Player ID: {params.id}</p>

            {/* UNIFORM FIXED HEIGHT VIDEO WRAPPER */}
            <div className="relative bg-black rounded-xl border border-white/10 w-full 
                            h-[60vh] max-h-[700px] overflow-hidden flex items-center justify-center">

              {/* Simulated LIVE indicator */}
              <span className="animate-pulse text-red-500 font-bold text-xl absolute top-4 left-4">
                ● LIVE
              </span>

              {/* Placeholder feed area */}
              <span className="animate-pulse text-red-500 font-bold">● LIVE FEED</span>

            </div>
          </div>

        </div>

        {/* RIGHT: INTERACTIVE SANCTUARY (CHAT) */}
        <div className="w-80 border-l border-white/10 bg-gray-950 flex flex-col hidden lg:flex">

          {/* Header */}
          <div className="p-4 border-b border-white/10 font-bold">
            Virtual Sanctuary
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="text-xs text-gray-500 text-center">Chat started</div>
            <div className="text-sm">
              <span className="text-violet-400 font-bold">User1: </span>
              Hallelujah!
            </div>
            <div className="text-sm">
              <span className="text-blue-400 font-bold">Sarah: </span>
              Watching from Texas!
            </div>
            <div className="text-sm">
              <span className="text-green-400 font-bold">Mike: </span>
              What chapter is this?
            </div>
          </div>

          {/* Chat input */}
          <div className="p-4 bg-gray-900 border-t border-white/10">
            <input
              type="text"
              placeholder="Send a message..."
              className="w-full bg-black border border-white/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
