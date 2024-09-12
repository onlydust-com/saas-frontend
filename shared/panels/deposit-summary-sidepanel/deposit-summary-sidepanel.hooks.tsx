import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { DepositSummarySidepanelData } from "@/shared/panels/deposit-summary-sidepanel/deposit-summary-sidepanel.types";

export function useDepositSummarySidepanel() {
  return useSinglePanelContext<DepositSummarySidepanelData>("deposit-summary");
}
