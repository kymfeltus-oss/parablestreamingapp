"use client";

import { useState } from "react";
import { PlusCircle, Music2, Film } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function UploadPraiseBreak({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (event: any) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `praise-breaks/${fileName}`;

      // Upload to Supabase Storage
      let { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Add record to "posts" table
      await supabase.from('posts').insert({
        user_id: userId,
        video_url: filePath,
        media_type: 'praise_break',
        caption: 'New Praise Break! 🔥🙌'
      });

      alert("Praise Break Uploaded!");
    } catch (error) {
      alert("Error uploading!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-10 p-6 bg-black border border-dashed border-[#00f2ff]/30 rounded-xl flex flex-col items-center justify-center gap-4 group hover:border-[#00f2ff] transition-all">
      <div className="w-12 h-12 rounded-full bg-[#00f2ff]/10 flex items-center justify-center text-[#00f2ff] group-hover:scale-110 transition-transform">
        {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00f2ff]" /> : <PlusCircle />}
      </div>
      <div className="text-center">
        <p className="text-[10px] font-black tracking-widest text-white uppercase">Upload Praise Break</p>
        <p className="text-[8px] text-gray-500 uppercase mt-1 italic font-mono">Accepts MP4, MOV // Max 60s</p>
      </div>
      <input 
        type="file" 
        accept="video/*" 
        onChange={handleUpload} 
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}