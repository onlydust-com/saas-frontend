import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useBulkContributorSelection() {
  return useSinglePanelContext("bulk-contributor-selection");
}
