import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useProjectFilterDataSidePanel() {
  return useSinglePanelContext("project-filter-data");
}
