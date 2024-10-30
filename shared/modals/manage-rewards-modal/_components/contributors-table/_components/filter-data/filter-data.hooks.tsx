import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useContributorsFilterDataSidePanel() {
  return useSinglePanelContext("contributors-filter-data");
}
