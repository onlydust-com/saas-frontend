import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useTransactionsSidepanel() {
  return useSinglePanelContext("transactions");
}
