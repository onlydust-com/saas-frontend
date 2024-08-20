import { ProjectStatsInterface } from "@/core/domain/project/models/project-stats-model";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

export interface ProjectStatsProps {
  data: ProjectStatsInterface;
  onChangeRangeType: (type: DateRangeType) => void;
  rangeType: DateRangeType;
}
