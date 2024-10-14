import {
  ActivityGraphData,
  ActivityGraphLevelRange,
} from "@/shared/features/contributors/activity-graph/activity-graph.types";

export interface DayProps {
  day: Date;
  levelRange: ActivityGraphLevelRange;
  data: ActivityGraphData[];
}
