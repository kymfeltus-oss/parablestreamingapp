export default function CancelPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Donation canceled</h1>
        <p className="text-gray-400 text-sm">
          No charge was made. You can close this page or try again later.
        </p>
      </div>
    </div>
  );
}
