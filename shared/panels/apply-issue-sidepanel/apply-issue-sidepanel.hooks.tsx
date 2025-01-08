import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";

import { ApplyIssueSidepanelData } from "./apply-issue-sidepanel.types";

export function useApplyIssueSidePanel(config?: SidePanelConfig) {
  return useSinglePanelContext<ApplyIssueSidepanelData>("apply-issue", config);
}
