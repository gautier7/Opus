import Hello from "@/components/Hello";
import { formatProjectName } from "@/lib/utils";

export default function Home() {
  const name = formatProjectName("Opus MVP");
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">Welcome to {name}</h1>
        <p className="text-sm opacity-80">Next.js + Tailwind + @/* alias ready</p>
        <Hello name="Gautier" />
      </main>
    </div>
  );
}
