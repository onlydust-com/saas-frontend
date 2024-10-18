import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useUserContributionsFilterDataSidePanel() {
  return useSinglePanelContext("user-contributions-filter-data");
}
