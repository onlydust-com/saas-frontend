import { ReactNode } from "react";

export interface CancelRewardProps {
  projectId: string;
  rewardId: string;
  children: (props: { cancel: () => void; isCanceling: boolean }) => ReactNode;
}
