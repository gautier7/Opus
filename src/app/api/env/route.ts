import { NextResponse } from "next/server";

export async function GET() {
  const model = process.env.OPENAI_MODEL ?? null;
  const openaiApiKeyConfigured = Boolean(
    (process.env.OPENAI_API_KEY ?? "").trim().length > 0
  );
  const redisEnv = {
    KV_URL: Boolean(process.env.KV_URL),
    KV_REST_API_URL: Boolean(process.env.KV_REST_API_URL),
    KV_REST_API_TOKEN: Boolean(process.env.KV_REST_API_TOKEN),
    KV_REST_API_READ_ONLY_TOKEN: Boolean(process.env.KV_REST_API_READ_ONLY_TOKEN),
    REDIS_URL: Boolean(process.env.REDIS_URL),
    REDIS_REST_API_URL: Boolean(process.env.REDIS_REST_API_URL),
    REDIS_REST_API_TOKEN: Boolean(process.env.REDIS_REST_API_TOKEN),
    UPSTASH_REDIS_REST_URL: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    UPSTASH_REDIS_REST_TOKEN: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
  };

  return NextResponse.json({ model, openaiApiKeyConfigured, redisEnv });
}


