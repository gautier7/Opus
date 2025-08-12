export type ProjectStatus = "collecting" | "complete";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string; // ISO string for portability
}

export interface Message {
  id: string;
  projectId: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export type DocumentType = "PRD" | "ARCH";

export interface Document {
  projectId: string;
  type: DocumentType;
  content: string;
  updatedAt: string;
}

export interface ImplementationPlan {
  project: {
    name: string;
    description: string;
  };
  issues: Array<{
    title: string;
    description: string;
    priority: 0 | 1 | 2 | 3;
    estimate: 1 | 2 | 3 | 5 | 8;
    labels: string[];
  }>;
}


