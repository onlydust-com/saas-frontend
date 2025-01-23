import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useUserProjectsFilterDataSidePanel() {
  return useSinglePanelContext("user-projects-filter-data");
}
