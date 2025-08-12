export default function Hello({ name }: { name: string }) {
  return (
    <div className="p-4 rounded-lg bg-foreground text-background">
      Hello, {name}!
    </div>
  );
}


