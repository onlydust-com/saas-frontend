import { ItemNav } from "@/design-system/molecules/item-nav";

import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";

import { SecondaryMenuProps } from "./secondary-menu.types";

export function SecondaryMenu({ isFolded }: SecondaryMenuProps) {
  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;
  return (
    <>
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-chat-4-line" }}
        linkProps={{ href: "/test" }}
        translate={{ token: "primaryNavigation:secondaryMenu.support" }}
        onClick={() => setIsOpen(true)}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-settings-line" }}
        linkProps={{ href: "/test" }}
        translate={{ token: "primaryNavigation:secondaryMenu.settings" }}
        isDisabled={true}
      />
      <FeedbackDrawer state={feedbackDrawerState} />
    </>
  );
}
