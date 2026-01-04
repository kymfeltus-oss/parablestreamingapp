"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

function toNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function W2PreviewPage() {
  const supabase = createSupabaseBrowser();
  const [items, setItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [returnId, setReturnId] = useState<string | null>(null);

  async function refresh(retId: string) {
    const { data: docs } = await supabase
      .from("parsed_documents")
      .select("*")
      .eq("return_id", retId)
      .eq("doc_type", "W2")
      .order("created_at");

    setItems(docs || []);
  }

  async function recomputeWithholding(uid: string, rid: string) {
    const { data: approved } = await supabase
      .from("parsed_documents")
      .select("extracted")
      .eq("return_id", rid)
      .in("doc_type", ["W2", "1099NEC"])
      .eq("approved", true);

    const total = (approved || []).reduce((s: number, r: any) => {
      const w = r?.extracted?.federal_withholding;
      return s + toNum(w);
    }, 0);

    await supabase.from("return_answers").upsert(
      {
        user_id: uid,
        return_id: rid,
        key: "federal_withholding",
        value: String(total),
      },
      { onConflict: "return_id,key" }
    );
  }

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      setUserId(data.user.id);

      const year = new Date().getFullYear();
      const { data: ret } = await supabase
        .from("tax_returns")
        .select("id")
        .eq("user_id", data.user.id)
        .eq("tax_year", year)
        .single();

      setReturnId(ret.id);
      await refresh(ret.id);
    })();
  }, []);

  async function approve(doc: any) {
    if (!userId || !returnId) return;

    await supabase.from("parsed_documents").update({ approved: true }).eq("id", doc.id);

    await supabase.from("income_lines").insert({
      user_id: userId,
      return_id: returnId,
      source: `W2 ${doc.extracted.employer_name}`,
      amount: toNum(doc.extracted.wages),
      source_id: doc.id,
    });

    await recomputeWithholding(userId, returnId);
    await refresh(returnId);
  }

  if (!items.length) return <div>No W2 documents found yet.</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Review your W2s</h1>

      <div className="mt-6 grid gap-4">
        {items.map((d) => (
          <div key={d.id} className="card p-5">
            <div className="font-medium">{d.extracted.employer_name}</div>
            <div className="text-sm text-white/70">Wages ${d.extracted.wages}</div>
            <div className="text-sm text-white/70">Withheld ${d.extracted.federal_withholding}</div>

            <button
              className="btn btn-primary mt-4"
              disabled={d.approved}
              onClick={() => approve(d)}
            >
              {d.approved ? "Approved" : "Approve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
