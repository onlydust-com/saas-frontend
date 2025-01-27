import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useCategoriesProjectsFilterDataSidePanel() {
  return useSinglePanelContext("categories-projects-filter-data");
}
