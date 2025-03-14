"use client";

import { useState } from "react";

import { NotificationsButton } from "@/shared/features/notifications/_components/notifications-button/notifications-button";
import { NotificationsContent } from "@/shared/features/notifications/_components/notifications-content/notifications-content";
import { PullRequestSurvey } from "@/shared/survey/pull-request-survey/pull-request-survey";
import { usePullRequestSurvey } from "@/shared/survey/pull-request-survey/use-pull-request-survey";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isOpenSurvey, openSurvey, closeSurvey, handleSubmit, contribution } = usePullRequestSurvey();

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <NotificationsButton />
        </PopoverTrigger>
        <PopoverContent className="z-[70] h-[400px] w-[100dvw] sm:w-[560px]" align="end">
          <NotificationsContent onClose={() => setIsOpen(false)} openSurvey={openSurvey} />
        </PopoverContent>
      </Popover>
      <PullRequestSurvey
        isOpen={isOpenSurvey}
        onClose={closeSurvey}
        onSubmit={handleSubmit}
        contribution={contribution}
      />
    </>
  );
}
