import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

export function useContributionsSidepanel() {
  return useSinglePanelContext<ContributionsPanelData>("contribution-details");
}
