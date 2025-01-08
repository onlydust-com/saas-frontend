import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";

import { ApplyIssuesPrefillLabels } from "./apply-issue-sidepanel.constants";
import { ApplyIssueSidepanelData } from "./apply-issue-sidepanel.types";

export function useApplyIssueSidePanel(config?: SidePanelConfig) {
  return useSinglePanelContext<ApplyIssueSidepanelData>("apply-issue", config);
}

export function useApplyIssuePrefillLabel() {
  const arrayOfLabels = ApplyIssuesPrefillLabels;

  return () => {
    const randomIndex = Math.floor(Math.random() * arrayOfLabels.length);
    return arrayOfLabels[randomIndex];
  };
}
