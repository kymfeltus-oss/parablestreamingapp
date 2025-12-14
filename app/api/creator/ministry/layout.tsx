export default function MinistryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide">
            Ministry Creator
          </h1>
          <nav className="text-sm text-zinc-400">
            <span className="mr-4">Dashboard</span>
            <span className="mr-4">Messages</span>
            <span>Live</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
