import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useEcosystemProjectsFilterDataSidePanel() {
  return useSinglePanelContext("ecosystem-projects-filter-data");
}
