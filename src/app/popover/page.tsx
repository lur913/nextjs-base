import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Page() {
  return (
    <div>
      <h1 className="py-4 uppercase font-bold">Popover Page</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent side="right">Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
}
