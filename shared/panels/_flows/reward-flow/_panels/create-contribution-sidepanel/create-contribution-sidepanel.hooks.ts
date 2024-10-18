import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useCreateContributionSidepanel() {
  return useSinglePanelContext("reward-details-create-contribution");
}
