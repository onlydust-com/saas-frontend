import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useMyRewardsTransactionsSidepanel() {
  return useSinglePanelContext("my-rewards-transactions");
}
