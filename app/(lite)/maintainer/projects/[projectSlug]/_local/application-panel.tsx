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
  issueId,
  onSuccess,
}: PropsWithChildren<{
  contributorId: number;
  applicationId?: string;
  issueId?: number;
  onSuccess?: () => void;
}>) {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent className="h-full max-h-[95dvh]">
          <AssignIssuePanel
            contributorId={contributorId}
            applicationId={applicationId}
            issueId={issueId}
            onSuccess={() => {
              setIsDrawerOpen(false);
              onSuccess?.();
            }}
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
          issueId={issueId}
          onSuccess={() => {
            setIsSheetOpen(false);
            onSuccess?.();
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
