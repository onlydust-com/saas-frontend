"use client";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";

export default function FeedbackPage() {
  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open feedback drawer</Button>
      <FeedbackDrawer state={feedbackDrawerState} />
    </div>
  );
}
