import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useSingleContributionValidation() {
  return useSinglePanelContext("single-contribution-validation");
}
