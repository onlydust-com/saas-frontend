import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { IssuesSearchSidepanelData } from "@/shared/panels/contribution-sidepanel/_features/issues-search-sidepanel/issues-search-sidepanel.types";

export function useIsssuesSearchSidepanel() {
  return useSinglePanelContext<IssuesSearchSidepanelData>("contribution-details-issue-search");
}
