import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { DepositTransactionSidepanelData } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel.types";

export function useDepositTransactionSidepanel() {
  return useSinglePanelContext<DepositTransactionSidepanelData>("deposit-transaction");
}
