import { SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";
import { ContributorSidepanelData } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.types";

export function useContributorSidePanel(config?: SidePanelConfig) {
  return useSinglePanelContext<ContributorSidepanelData>("contributor-detail", {
    width: SIDE_PANEL_SIZE["3xl"],
    ...config,
  });
}
