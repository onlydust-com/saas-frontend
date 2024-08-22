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
        icon={MessageSquare}
        translate={{ token: "primaryNavigation:secondaryMenu.support" }}
        onClick={handleOpenFeedbackDrawer}
      />
      <ItemNav
        isFolded={isFolded}
        icon={Settings}
        translate={{ token: "primaryNavigation:secondaryMenu.settings" }}
        isDisabled={true}
      />
      <FeedbackDrawer state={feedbackDrawerState} />
    </>
  );
}
