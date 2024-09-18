import { ActivityGraphWeek, ActivityGraphWeekData } from "@/shared/features/activity-graph/activity-graph.types";

export interface ActivityGraphWeekProps {
  week: ActivityGraphWeek;
  data?: ActivityGraphWeekData<unknown>;
}
