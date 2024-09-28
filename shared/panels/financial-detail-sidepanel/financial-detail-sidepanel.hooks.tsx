import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { FinancialDetailSidepanelData } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.types";

export function useFinancialDetailSidepanel() {
  return useSinglePanelContext<FinancialDetailSidepanelData>("financial-detail");
}
