export default function MinistryCreatorPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Your Ministry. Your Voice.
        </h2>

        <p className="text-zinc-400 mb-6 leading-relaxed">
          This space is designed for pastors, teachers, and ministry leaders
          to teach, stream, and shepherd their audience with clarity and depth.
        </p>

        <div className="flex gap-4">
          <button className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded">
            Go Live
          </button>

          <button className="border border-zinc-600 px-5 py-2 rounded">
            Upload Message
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Ministry Overview
        </h3>

        <ul className="space-y-3 text-sm text-zinc-400">
          <li>• Weekly sermons and teachings</li>
          <li>• Live prayer and worship sessions</li>
          <li>• Bible study and series collections</li>
          <li>• Community engagement tools</li>
        </ul>
      </div>
    </div>
  );
}
