import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useSingleContributionSelection() {
  return useSinglePanelContext("single-contribution-selection");
}
