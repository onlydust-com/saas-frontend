import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useDepositTransactionSidepanel() {
  return useSinglePanelContext("deposit-transaction");
}
