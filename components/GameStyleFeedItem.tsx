export default function GameStyleFeedItem({ username, avatarUrl, likes, viewers }: any) {
  return (
    <div className="relative border-l-4 border-[#00f2ff] bg-black/40 p-5 mb-6 group hover:bg-[#00f2ff]/5 transition-all border-r border-t border-b border-white/5">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-none border-2 border-[#00f2ff]/30 overflow-hidden shadow-[0_0_10px_rgba(0,242,255,0.1)]">
          <img src={avatarUrl || "/placeholder-user.png"} className="w-full h-full object-cover" alt="User" />
        </div>
        <div className="flex-1">
          <h3 className="text-[12px] font-black text-white uppercase tracking-[4px] italic group-hover:text-[#00f2ff] transition-colors">{username}</h3>
          <div className="flex gap-6 mt-2">
            <div className="flex flex-col">
              <span className="text-[7px] text-gray-500 uppercase tracking-widest font-bold">Experience</span>
              <span className="text-[10px] text-[#00f2ff] font-black uppercase">{likes}</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-6">
              <span className="text-[7px] text-gray-500 uppercase tracking-widest font-bold">Sync_Status</span>
              <span className="text-[10px] text-white/80 font-black uppercase">{viewers}</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-[8px] font-black uppercase tracking-[5px] text-[#00f2ff] opacity-40 animate-pulse">Node_Active</div>
          <div className="text-[6px] text-gray-600 font-mono mt-1">SECURED_LINE_01</div>
        </div>
      </div>
    </div>
  );
}