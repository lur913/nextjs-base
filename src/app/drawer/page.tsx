import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Page() {
  return (
    <div data-vaul-drawer-wrapper className="p-4 fixed inset-0 bg-background">
      <h1 className="py-4 uppercase font-bold">Drawer Page</h1>
      <Drawer direction="bottom" shouldScaleBackground >
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="bg-gray-100 h-full fixed bottom-0 left-0 right-0 outline-none">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
