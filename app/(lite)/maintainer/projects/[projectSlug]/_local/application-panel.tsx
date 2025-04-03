"use client";

import { PropsWithChildren, useState } from "react";

import { AssignIssuePanel } from "@/app/(lite)/_shared/components/panels/assign-issue-panel";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

export function ApplicationPanel({
  children,
  contributorId,
  applicationId,
}: PropsWithChildren<{ contributorId: number; applicationId: string }>) {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent>
          <AssignIssuePanel
            contributorId={contributorId}
            applicationId={applicationId}
            onSuccess={() => setIsDrawerOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild className="cursor-pointer">
        {children}
      </SheetTrigger>

      <SheetContent showCloseButton={false} className="p-0">
        <AssignIssuePanel
          contributorId={contributorId}
          applicationId={applicationId}
          onSuccess={() => setIsSheetOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
