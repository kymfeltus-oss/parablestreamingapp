import GameStyleFeedItem from '@/components/GameStyleFeedItem';
import PraiseBreakCreator from '@/components/PraiseBreakCreator';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // 1. Force Login redirect
  if (!user) redirect("/login");

  // 2. Fetch the profile created during onboarding
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .eq('id', user.id)
    .single();

  // 3. Safety Fallback (Your recommendation for stability)
  const displayProfile = profile || { 
    id: user.id, 
    username: "KYM THE CEO", 
    avatar_url: null 
  };
  
  // 4. Resolve the Storage URL for the avatar pic
  let finalAvatar = null;
  if (displayProfile.avatar_url) {
    const { data } = supabase.storage.from('avatars').getPublicUrl(displayProfile.avatar_url);
    finalAvatar = data.publicUrl;
  }

  // 5. Build the strict object to pass to the client creator
  const creatorProfileProps = {
      id: displayProfile.id,
      username: displayProfile.username,
      avatar_url: finalAvatar
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 min-h-screen">
      <h2 className="text-[10px] font-black tracking-[5px] text-[#00f2ff] mb-8 uppercase italic underline decoration-[#00f2ff]/30 text-center">
        Live_Feed // Link_Active
      </h2>

      {/* The input area */}
      <PraiseBreakCreator profile={creatorProfileProps} />

      <div className="mt-12 space-y-6">
        {/* Your HUD-style feed item displaying your live identity */}
        <GameStyleFeedItem 
          username={displayProfile.username} 
          avatarUrl={finalAvatar}
          likes="SYNC_ACTIVE" 
          viewers="LIVE" 
        />
      </div>
    </div>
  );
}