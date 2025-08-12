import { kv } from "@vercel/kv";
import { Project } from "@/lib/types";

const PROJECTS_SET_KEY = "projects:index";

export async function createProject(name: string): Promise<Project> {
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
  const project = await kv.get<Project>(`project:${id}`);
  return project ?? null;
}

export async function listProjects(): Promise<Project[]> {
  const ids = (await kv.smembers(PROJECTS_SET_KEY)) ?? [];
  if (ids.length === 0) return [];
  const keys = ids.map((id) => `project:${id}`);
  const entries = (await kv.mget<Project[]>(...keys)) as (Project | null)[];
  return entries.filter(Boolean) as Project[];
}

export async function updateProject(
  id: string,
  updates: Partial<Pick<Project, "name" | "status">>
): Promise<Project | null> {
  const existing = await getProject(id);
  if (!existing) return null;
  const updated: Project = { ...existing, ...updates };
  await kv.set(`project:${id}`, updated);
  return updated;
}


