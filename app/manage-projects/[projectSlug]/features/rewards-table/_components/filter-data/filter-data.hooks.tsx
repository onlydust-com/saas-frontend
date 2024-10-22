import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useProjectRewardsFilterDataSidePanel() {
  return useSinglePanelContext("project-rewards-filter-data");
}
