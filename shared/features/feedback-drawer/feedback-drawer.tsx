"use client";

import { FilloutStandardEmbed } from "@fillout/react";

import { Drawer } from "@/design-system/molecules/drawer";

import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";

export function FeedbackDrawer({ state }: { state: ReturnType<typeof useFeedbackDrawerState> }) {
  const [isOpen, setIsOpen] = state;

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      hideHeader
      classNames={{
        body: "p-0 h-full",
      }}
    >
      <FilloutStandardEmbed
        filloutId="uUS6ESXXcjus"
        inheritParameters
        // parameters={{
        //   user_id: user?.id,
        //   first_name: user?.firstName || undefined,
        //   last_name: user?.lastName || undefined,
        //   email: user?.email || undefined,
        //   github_id: `${user?.githubUserId}` || undefined,
        //   github_login: user?.login || undefined,
        // }}
      />
    </Drawer>
  );
}
