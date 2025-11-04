import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div
      className="data-[state=show]:animate-in data-[state=hide]:animate-out fade-in slide-in-from-top-8 fade-out slide-out-to-top-8 duration-500"
      data-state="show"
    >
      <h1>Hello, World!</h1>
      <Button variant="destructive">Click me</Button>
    </div>
  );
}
