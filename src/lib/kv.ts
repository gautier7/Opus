import { kv } from "@vercel/kv";
import { Project } from "@/lib/types";

const PROJECTS_SET_KEY = "projects:index";

function assertKvConfigured(): void {
  // Support old KV_* names, new REDIS_* names, and Upstash names for compatibility
  const hasKvRest = Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
  const hasRedisRest = Boolean(
    process.env.REDIS_REST_API_URL && process.env.REDIS_REST_API_TOKEN
  );
  const hasUpstashRest = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
  const hasDirectUrl = Boolean(process.env.KV_URL);

  if (!hasKvRest && !hasRedisRest && !hasUpstashRest && !hasDirectUrl) {
    throw new Error(
      "Redis is not configured. Set REDIS_REST_API_URL and REDIS_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, or legacy KV_* vars) in .env.local."
    );
  }
}

export async function createProject(name: string): Promise<Project> {
  assertKvConfigured();
  const id = crypto.randomUUID();
  const project: Project = {
    id,
    name,
    status: "collecting",
    createdAt: new Date().toISOString(),
  };

  await kv.set(`project:${id}`, project);
  await kv.sadd(PROJECTS_SET_KEY, id);
  return project;
}

export async function getProject(id: string): Promise<Project | null> {
  assertKvConfigured();
  const project = await kv.get<Project>(`project:${id}`);
  return project ?? null;
}

export async function listProjects(): Promise<Project[]> {
  assertKvConfigured();
  const ids = (await kv.smembers<string>(PROJECTS_SET_KEY)) ?? [];
  if (ids.length === 0) return [];
  const keys = ids.map((id) => `project:${id}`);
  const entries = (await kv.mget<Project[]>(...keys)) as (Project | null)[];
  return entries.filter(Boolean) as Project[];
}

export async function updateProject(
  id: string,
  updates: Partial<Pick<Project, "name" | "status">>
): Promise<Project | null> {
  assertKvConfigured();
  const existing = await getProject(id);
  if (!existing) return null;
  const updated: Project = { ...existing, ...updates };
  await kv.set(`project:${id}`, updated);
  return updated;
}


