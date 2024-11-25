import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useContributorFilterDataSidePanel() {
  return useSinglePanelContext("contributors-filter-data");
}
