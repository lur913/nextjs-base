import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
    <>
      <h1 className="py-4 uppercase font-bold">Input Page</h1>
      <div className="grid gap-4 max-w-sm">
        <Label htmlFor="email" className="font-bold">
          Email
        </Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture" className="mt-4 font-bold">
          Picture
        </Label>
        <Input id="picture" type="file" />
      </div>
      <div className="grid gap-4 max-w-sm py-4">
        <Label htmlFor="email" className="font-bold">
          Disabled
        </Label>
        <Input type="email" id="email" placeholder="disabled" disabled />
      </div>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit" variant="default">
          Subscribe
        </Button>
      </div>
    </>
  );
}
