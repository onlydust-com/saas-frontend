import { FilloutStandardEmbed } from "@fillout/react";

import { Typo } from "@/design-system/atoms/typo";
import { Drawer } from "@/design-system/molecules/drawer";

import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function FeedbackDrawer({ state }: { state: ReturnType<typeof useFeedbackDrawerState> }) {
  const [isOpen, setIsOpen] = state;

  const { user } = useAuthUser();

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      header={{
        startContent: <Typo size={"2xl"} variant="heading" translate={{ token: "feedbackDrawer:title" }} />,
      }}
      classNames={{
        base: "bg-[#181818]",
        body: "p-0 h-full",
      }}
    >
      <FilloutStandardEmbed
        filloutId="uUS6ESXXcjus"
        inheritParameters
        parameters={{
          user_id: user?.id,
          first_name: user?.firstName || undefined,
          last_name: user?.lastName || undefined,
          email: user?.email || undefined,
          github_id: `${user?.githubUserId}` || undefined,
          github_login: user?.login || undefined,
        }}
      />
    </Drawer>
  );
}
