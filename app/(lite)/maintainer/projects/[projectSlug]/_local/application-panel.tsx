"use client";

import { PropsWithChildren } from "react";

import { AssignIssuePanel } from "@/app/(lite)/_shared/components/panels/assign-issue-panel";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

export function ApplicationPanel({ children, contributorId }: PropsWithChildren<{ contributorId?: number }>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent>{contributorId ? <AssignIssuePanel contributorId={contributorId} /> : null}</DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent showCloseButton={false} className="p-0">
        {contributorId ? <AssignIssuePanel contributorId={contributorId} /> : null}
      </SheetContent>
    </Sheet>
  );
}
