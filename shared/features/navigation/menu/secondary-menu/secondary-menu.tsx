import { MessageSquare, Settings } from "lucide-react";

import { ItemNav } from "@/design-system/molecules/item-nav";

import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";

import { SecondaryMenuProps } from "./secondary-menu.types";

export function SecondaryMenu({ isFolded }: SecondaryMenuProps) {
  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;

  function handleOpenFeedbackDrawer() {
    setIsOpen(true);
  }

  return (
    <>
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: MessageSquare }}
        translate={{ token: "primaryNavigation:secondaryMenu.support" }}
        onClick={handleOpenFeedbackDrawer}
      />
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: Settings }}
        translate={{ token: "primaryNavigation:secondaryMenu.settings" }}
        isComingSoon={true}
      />
      <FeedbackDrawer state={feedbackDrawerState} />
    </>
  );
}
