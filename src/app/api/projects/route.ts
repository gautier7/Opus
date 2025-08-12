import { NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/kv";

export async function GET() {
  try {
    const projects = await listProjects();
    return NextResponse.json({ projects });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error fetching projects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = (await request.json()) as { name?: string };
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const project = await createProject(name.trim());
    return NextResponse.json({ project }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error creating project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


