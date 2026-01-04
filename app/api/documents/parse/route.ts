import { NextResponse } from "next/server";
import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const textract = new TextractClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function numFromText(t: string) {
  const cleaned = (t || "").replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function pickDocType(fileName: string, requested?: string) {
  if (requested === "W2") return "W2";
  if (requested === "1099NEC") return "1099NEC";
  const lower = (fileName || "").toLowerCase();
  if (lower.includes("1099")) return "1099NEC";
  return "W2";
}

export async function POST(req: Request) {
  const { documentId, returnId, userId, docType } = await req.json();

  const { data: docRow, error: docErr } = await supabase
    .from("documents")
    .select("file_path,file_name")
    .eq("id", documentId)
    .single();

  if (docErr || !docRow) {
    return NextResponse.json({ success: false, error: "Document not found" }, { status: 400 });
  }

  const actualType = pickDocType(docRow.file_name || "", docType);

  const { data: file, error: dlErr } = await supabase.storage
    .from("tax-docs")
    .download(docRow.file_path);

  if (dlErr || !file) {
    return NextResponse.json({ success: false, error: "Download failed" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  const result = await textract.send(
    new AnalyzeDocumentCommand({
      Document: { Bytes: bytes },
      FeatureTypes: ["FORMS"],
    })
  );

  if (actualType === "W2") {
    let wages = 0;
    let withholding = 0;
    let employer = "";

    for (const b of result.Blocks || []) {
      const t = (b.Text || "").toLowerCase();

      if (!employer && t.includes("employer")) employer = b.Text || employer;

      if (!wages && (t.includes("wages") || t.includes("box 1"))) {
        wages = numFromText(b.Text || "");
      }

      if (!withholding && (t.includes("federal income tax withheld") || t.includes("box 2"))) {
        withholding = numFromText(b.Text || "");
      }
    }

    await supabase.from("parsed_documents").insert({
      user_id: userId,
      return_id: returnId,
      document_id: documentId,
      doc_type: "W2",
      extracted: {
        employer_name: employer || "Unknown employer",
        wages,
        federal_withholding: withholding,
      },
      approved: false,
    });

    return NextResponse.json({ success: true, doc_type: "W2" });
  }

  if (actualType === "1099NEC") {
    let payer = "";
    let payerTin = "";
    let nec = 0;
    let withholding = 0;

    for (const b of result.Blocks || []) {
      const t = (b.Text || "").toLowerCase();

      if (!payer && (t.includes("payer") || t.includes("payer name"))) payer = b.Text || payer;

      if (!payerTin && (t.includes("payer tin") || t.includes("payer's tin") || t.includes("payer federal id"))) {
        payerTin = b.Text || payerTin;
      }

      if (!nec && (t.includes("nonemployee compensation") || t.includes("box 1"))) {
        nec = numFromText(b.Text || "");
      }

      if (!withholding && (t.includes("federal income tax withheld") || t.includes("box 4"))) {
        withholding = numFromText(b.Text || "");
      }
    }

    await supabase.from("parsed_documents").insert({
      user_id: userId,
      return_id: returnId,
      document_id: documentId,
      doc_type: "1099NEC",
      extracted: {
        payer_name: payer || "Unknown payer",
        payer_tin: payerTin || "",
        nonemployee_comp: nec,
        federal_withholding: withholding,
      },
      approved: false,
    });

    return NextResponse.json({ success: true, doc_type: "1099NEC" });
  }

  return NextResponse.json({ success: false, error: "Unsupported type" }, { status: 400 });
}
