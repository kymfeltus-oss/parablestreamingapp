"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function AdminPage() {
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    check();
  }, []);

  async function check() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsAdmin(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      setIsAdmin(true);
      const { data } = await supabase
        .from("profiles")
        .select("id, email, display_name, role")
        .order("created_at", { ascending: false });
      setUsers(data || []);
    } else {
      setIsAdmin(false);
    }
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Access denied.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <div className="space-y-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-[#111] border border-white/10 rounded-lg p-3 text-sm flex justify-between"
          >
            <div>
              <p className="font-bold">{u.display_name || u.email}</p>
              <p className="text-xs text-gray-400">{u.email}</p>
            </div>
            <span className="text-xs text-gray-300">{u.role || "user"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
