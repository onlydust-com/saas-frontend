import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useDepositSummarySidepanel() {
  return useSinglePanelContext("deposit-summary");
}
