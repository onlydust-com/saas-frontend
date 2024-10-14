import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { RewardDetailSidepanelData } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.types";

export function useRewardDetailSidepanel() {
  return useSinglePanelContext<RewardDetailSidepanelData>("reward-detail");
}
