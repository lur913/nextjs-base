import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label"

import { MinusIcon, PlusIcon } from "lucide-react";

export default function Page() {
  return (
    <div>
      <h1 className="py-4 uppercase font-bold">button-group Page</h1>
      <div className="flex flex-col gap-4">
        <ButtonGroup aria-label="button group">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
        </ButtonGroup>

        <ButtonGroup aria-label="button group">
          <Button variant="default">Button 1</Button>
          <ButtonGroupSeparator />
          <Button variant="default">Button 2</Button>
        </ButtonGroup>

        <ButtonGroup
          orientation="vertical"
          aria-label="Media controls"
          className="h-fit"
        >
          <Button variant="outline" size="icon">
            <PlusIcon />
          </Button>
          <Button variant="outline" size="icon">
            <MinusIcon />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <ButtonGroupText>Text</ButtonGroupText>
          <Button>Button</Button>
        </ButtonGroup>

        <ButtonGroup>
          <ButtonGroupText asChild>
            <Label htmlFor="name">Text</Label>
          </ButtonGroupText>
          <Input placeholder="Type something here..." id="name" />
        </ButtonGroup>
      </div>
    </div>
  );
}
