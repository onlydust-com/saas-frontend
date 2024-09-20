import { ActivityGraphWeek, ActivityGraphWeekData } from "@/shared/features/activity-graph/activity-graph.types";

export interface ActivityGraphRowProps {
  weeks: ActivityGraphWeek[];
  data: { [key: string]: ActivityGraphWeekData<unknown> };
  asLabel?: boolean;
  isLastRow?: boolean;
}
