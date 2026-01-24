"use client";

import { Drawer } from "vaul";
import { useDrawer } from "@/contexts/drawer-context";

export function MyDrawer() {
  const { isOpen, closeDrawer,openDrawer } = useDrawer();

  return (
    <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={closeDrawer}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0   bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] z-50 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white h-0">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          </div>
          <div className="p-4 bg-white overflow-scroll">
            {/* Content */}
            <p className="mt-2 text-sm text-gray-600">
              This is an example of a drawer using Vaul UI library.
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm  
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br/>

            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// Hook to use the drawer from any component
export function useMyDrawer() {
  const drawerContext = new Map();
  
  const openDrawer = () => {
    // This will be set by the drawer provider
    drawerContext.set("open", true);
  };

  return { openDrawer };
}
