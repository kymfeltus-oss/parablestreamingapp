// app/actions/profile.ts
"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Utility function to create a server client instance
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
 * Handles the profile creation/update submitted from the client-side form.
 */
export async function updateProfile(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();
  const username = formData.get("username") as string;
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If the user somehow loses session, redirect them to log in
    redirect("/login"); 
  }

  // Perform the Upsert: Insert if the row doesn't exist (first time), 
  // or update if the user is somehow editing an existing profile.
  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id, // CRITICAL: Link the profile row to the auth user ID
        username: username,
      },
      // Conflict on the 'id' ensures we only update the existing row if it's there
      { onConflict: 'id' } 
    );

  if (error) {
    console.error("Profile update failed:", error);
    return { success: false, error: error.message };
  }
  
  // Success: Redirect the user to the main application area
  redirect("/dashboard");
}