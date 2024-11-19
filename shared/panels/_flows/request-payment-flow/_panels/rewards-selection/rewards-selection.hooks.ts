import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useRewardsSelectionPanel() {
  return useSinglePanelContext("rewards-selection");
}
