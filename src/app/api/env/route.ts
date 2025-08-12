import { NextResponse } from "next/server";

export async function GET() {
  const model = process.env.OPENAI_MODEL ?? null;
  const openaiApiKeyConfigured = Boolean(
    (process.env.OPENAI_API_KEY ?? "").trim().length > 0
  );

  return NextResponse.json({ model, openaiApiKeyConfigured });
}


