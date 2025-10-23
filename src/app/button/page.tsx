import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react"


export default function TestPage() {
  return (
    <div>
      <h1>Button Page</h1>
      <div className="space-x-2">
        <div className="py-2">变体</div>
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <div className="py-2">禁用</div>
        <Button disabled>Default</Button>
        <Button disabled variant="destructive">Destructive</Button>
        <Button disabled variant="outline">Outline</Button>
        <Button disabled variant="secondary">Secondary</Button>
        <Button disabled variant="ghost">Ghost</Button>
        <Button disabled variant="link">Link</Button>
        <div className="py-2">尺寸</div>
        <Button>Default</Button>
        <Button size="sm">sm</Button>
        <Button size="lg">lg</Button>
        <Button size="icon"><ArrowUpIcon/></Button>
        <Button size="icon-sm"><ArrowUpIcon/></Button>
        <Button size="icon-lg"><ArrowUpIcon/></Button>
      </div>
    </div>
  );
}
