import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useContributorContributionsFilterDataSidePanel() {
  return useSinglePanelContext("contributor-contributions-filter-data");
}
