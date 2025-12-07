// app/actions/profile.ts
"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}

/**
 * Handles the profile creation/update, including optional avatar upload.
 */
export async function updateProfile(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();
  const username = formData.get("username") as string;
  const avatarFile = formData.get("avatar") as File; // Retrieve the uploaded file

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); 
  }

  let avatarUrl = null;

  // --- NEW LOGIC: Handle Avatar Upload to Supabase Storage ---
  if (avatarFile && avatarFile.size > 0) {
    // 1. Create a unique path (e.g., bucket/user_id/avatar.jpg)
    const filePath = `${user.id}/${Date.now()}_avatar.jpg`;
    
    // 2. Convert File to Buffer/ArrayBuffer for Supabase
    const fileBuffer = await avatarFile.arrayBuffer();

    // 3. Upload the file to your Storage bucket (ASSUMING BUCKET NAME IS 'avatars')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars') // !!! CHANGE 'avatars' to your actual bucket name !!!
      .upload(filePath, fileBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: avatarFile.type,
      });

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      return { success: false, error: "Failed to upload avatar image." };
    }

    // 4. Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    avatarUrl = publicUrlData.publicUrl;
  }
  // --- END NEW LOGIC ---

  // Update the profile data object
  const profileData: any = {
    id: user.id,
    username: username,
  };
  if (avatarUrl) {
    profileData.avatar_url = avatarUrl;
  }

  // Perform the Upsert: Insert or update the profile row
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(profileData, { onConflict: 'id' });

  if (profileError) {
    console.error("Profile update failed:", profileError);
    return { success: false, error: profileError.message };
  }
  
  // Success: Redirect the user to the main application area
  redirect("/dashboard");
}