import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useBulkContributionSelection() {
  return useSinglePanelContext("bulk-contribution-selection");
}
