import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";
import { ContributorSidepanelData } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.types";

export function useContributorSidePanel(config?: SidePanelConfig) {
  return useSinglePanelContext<ContributorSidepanelData>("contributor-detail", config);
}
