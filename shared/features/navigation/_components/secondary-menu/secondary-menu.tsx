import { LogIn, MessageSquare, Settings } from "lucide-react";

import { ItemNav } from "@/design-system/molecules/item-nav";

import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";
import { useLogout } from "@/shared/hooks/auth/use-logout";

export function SecondaryMenu() {
  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;
  const handleLogout = useLogout();

  function handleOpenFeedbackDrawer() {
    setIsOpen(true);
  }

  return (
    <>
      <ItemNav
        iconProps={{ component: MessageSquare }}
        translate={{ token: "primaryNavigation:secondaryMenu.support" }}
        onClick={handleOpenFeedbackDrawer}
      />
      <ItemNav
        iconProps={{ component: Settings }}
        translate={{ token: "primaryNavigation:secondaryMenu.settings" }}
        isComingSoon={true}
      />
      <ItemNav
        iconProps={{ component: LogIn }}
        translate={{ token: "primaryNavigation:secondaryMenu.logout" }}
        onClick={handleLogout}
      />
      <FeedbackDrawer state={feedbackDrawerState} />
    </>
  );
}
