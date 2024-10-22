import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useBulkContributionValidation() {
  return useSinglePanelContext("bulk-contribution-validation");
}
