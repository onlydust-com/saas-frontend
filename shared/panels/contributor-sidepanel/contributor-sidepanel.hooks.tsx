import { SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";
import {
  ContributorSidepanelData,
  ContributorSidepanelType,
} from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.types";

interface useContributorSidePanelConfig extends SidePanelConfig {
  type?: ContributorSidepanelType;
}
export function useContributorSidePanel(config?: useContributorSidePanelConfig) {
  const { type } = config ?? { type: "extended" };
  const { open, ...rest } = useSinglePanelContext<ContributorSidepanelData>("contributor-detail", {
    width: type === "compact" ? SIDE_PANEL_SIZE.m : SIDE_PANEL_SIZE.xl,
    ...config,
  });

  return {
    open: (data?: Omit<ContributorSidepanelData, "type">) => open({ type, ...(data || {}) }),
    ...rest,
  };
}
