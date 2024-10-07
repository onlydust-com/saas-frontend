import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useContributionsFilterDataSidePanel() {
  return useSinglePanelContext("contributions-filter-data");
}
