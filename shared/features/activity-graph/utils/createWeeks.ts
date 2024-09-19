import { eachWeekOfInterval, endOfWeek, startOfWeek } from "date-fns";

import { ActivityGraphWeek } from "@/shared/features/activity-graph/activity-graph.types";

import { getWeekId } from "./getWeekId";

export function createWeeks({ start, end }: { start: Date; end: Date }): ActivityGraphWeek[] {
  const eachWeek = eachWeekOfInterval({
    start,
    end,
  });

  return eachWeek.map(week => {
    const startWeek = startOfWeek(week, { weekStartsOn: 1 });
    const endWeek = endOfWeek(week, { weekStartsOn: 1 });

    return {
      id: getWeekId(week),
      startDate: startWeek,
      endDate: endWeek,
    };
  });
}
