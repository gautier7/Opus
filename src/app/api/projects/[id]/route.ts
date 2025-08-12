import { NextResponse } from "next/server";
import { getProject, updateProject } from "@/lib/kv";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ project });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error fetching project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = (await request.json()) as {
      name?: string;
      status?: "collecting" | "complete";
    };
    const updated = await updateProject(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ project: updated });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error updating project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


