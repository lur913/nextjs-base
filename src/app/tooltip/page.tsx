import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  return (
    <div>
      <h1 className="py-4 uppercase font-bold">Tooltip Page</h1>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
