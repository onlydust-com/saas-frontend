import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useHackathonProjectsFilterDataSidePanel() {
  return useSinglePanelContext("hackathon-projects-filter-data");
}
