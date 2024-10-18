import {
  ActivityGraphData,
  ActivityGraphLevelRange,
} from "@/shared/features/contributors/activity-graph/activity-graph.types";

export interface ColumnProps {
  days: Date[];
  levelRange: ActivityGraphLevelRange;
  data: ActivityGraphData[];
}
