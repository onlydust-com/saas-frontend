import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useTimelineFilterDataSidePanel() {
  return useSinglePanelContext("timeline-filter-data");
}
