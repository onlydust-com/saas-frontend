import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useProjectTransactionsSidepanel() {
  return useSinglePanelContext("project-transactions");
}
