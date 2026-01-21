"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Send, Music } from 'lucide-react';

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
}

export default function PraiseBreakCreator({ profile }: { profile: Profile }) {
  const supabase = createClient();
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [postType, setPostType] = useState<'status' | 'praise_break'>('status');

  const handleTransmit = async () => {
    if (!status.trim()) return;
    setIsUploading(true);

    try {
      // Linked via profile.id to prevent the 42703 "user_id" error
      const { error: postError } = await supabase.from('posts').insert({
        profile_id: profile.id, 
        content: status.trim(),
        type: postType
      });

      if (postError) throw postError;
      
      alert("TRANSMISSION SUCCESSFUL");
      setStatus("");
    } catch (err: any) {
      alert(`TRANSMISSION FAILED: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-black border border-[#00f2ff]/30 p-4 shadow-[0_0_20px_rgba(0,242,255,0.1)] mb-10">
      <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
        <div className="w-12 h-12 rounded-full border border-[#00f2ff] overflow-hidden bg-black shadow-[0_0_10px_#00f2ff]/20">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#00f2ff]">CEO</div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-[#00f2ff] font-black tracking-[3px] uppercase italic">{profile.username}</p>
        </div>
      </div>

      <textarea 
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="INPUT DATA FOR THE STREAM..."
        className="w-full bg-black border border-white/10 p-4 text-[11px] text-white outline-none focus:border-[#00f2ff] h-20 resize-none mb-4 font-mono uppercase tracking-wider"
      />

      <div className="flex justify-between items-center">
        <button 
          type="button"
          onClick={() => setPostType(postType === 'status' ? 'praise_break' : 'status')}
          className={`flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-[2px] border transition-all ${postType === 'praise_break' ? 'bg-[#00f2ff] text-black border-[#00f2ff]' : 'text-gray-500 border-white/10'}`}
        >
          <Music size={12} /> {postType === 'praise_break' ? 'Praise Break ON' : 'Praise Break OFF'}
        </button>

        <button 
          onClick={handleTransmit}
          disabled={isUploading}
          className="px-8 py-2 bg-[#00f2ff] text-black text-[10px] font-black uppercase tracking-[4px] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {isUploading ? 'SYNCING...' : 'Transmit'}
        </button>
      </div>
    </div>
  );
}