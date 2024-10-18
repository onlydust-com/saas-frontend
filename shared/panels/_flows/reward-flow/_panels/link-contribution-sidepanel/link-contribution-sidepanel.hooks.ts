import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useLinkContributionSidepanel() {
  return useSinglePanelContext("reward-details-link-contribution");
}
