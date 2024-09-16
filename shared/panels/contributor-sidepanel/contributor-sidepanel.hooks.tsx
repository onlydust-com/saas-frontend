import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { ContributorSidepanelData } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.types";

export function useProjectSidePanel() {
  return useSinglePanelContext<ContributorSidepanelData>("contributor-detail");
}
