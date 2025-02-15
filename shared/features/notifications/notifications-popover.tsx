"use client";

import { useState } from "react";

import { NotificationsButton } from "@/shared/features/notifications/_components/notifications-button/notifications-button";
import { NotificationsContent } from "@/shared/features/notifications/_components/notifications-content/notifications-content";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <NotificationsButton />
      </PopoverTrigger>
      <PopoverContent className="z-[70] h-[400px] w-[100dvw] sm:w-[560px]" align="end">
        <NotificationsContent onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
