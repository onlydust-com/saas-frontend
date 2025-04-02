"use client";

import { PropsWithChildren } from "react";

import { AssignIssuePanel } from "@/app/(lite)/_shared/components/panels/assign-issue-panel";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

export function ApplicationPanel({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent>
          <AssignIssuePanel />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent showCloseButton={false} className="p-0">
        <AssignIssuePanel />
      </SheetContent>
    </Sheet>
  );
}
