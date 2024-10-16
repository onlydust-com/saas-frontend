import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useSelectableContributorsFilterDataSidePanel() {
  return useSinglePanelContext("selectable-contributors-filter-data");
}
