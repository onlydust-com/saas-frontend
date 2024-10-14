import {
  addDays,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  isSameMonth,
  startOfMonth,
  subYears,
} from "date-fns";

import { ActivityGraphConfig } from "@/shared/features/contributors/activity-graph/activity-graph.constants";

const useActivityGraphRange = ({ start, end }: { start?: Date; end?: Date }) => {
  if (start) {
    return {
      from: start,
      to: addYears(addDays(start, 1), ActivityGraphConfig.number_of_years),
    };
  }

  if (end) {
    return {
      from: subYears(addDays(end, 1), ActivityGraphConfig.number_of_years),
      to: end,
    };
  }

  return {
    from: subYears(addDays(new Date(), 1), ActivityGraphConfig.number_of_years),
    to: new Date(),
  };
};

const useActivityGraphGrid = ({ from, to }: { from: Date; to: Date }): { months: { month: Date; days: Date[] }[] } => {
  const months = eachMonthOfInterval({
    start: from,
    end: to,
  });

  return {
    months: months?.map(month => {
      if (isSameMonth(month, to)) {
        return {
          month,
          days: eachDayOfInterval({
            start: startOfMonth(month),
            end: to,
          }),
        };
      }

      if (isSameMonth(month, from)) {
        return {
          month,
          days: eachDayOfInterval({
            start: from,
            end: endOfMonth(month),
          }),
        };
      }

      return {
        month,
        days: eachDayOfInterval({
          start: startOfMonth(month),
          end: endOfMonth(month),
        }),
      };
    }),
  };
};

const useActivityGraph = () => {
  const { from, to } = useActivityGraphRange({});

  return useActivityGraphGrid({ from, to });
};

const useActivityColumns = (days: Date[]) => {
  return days.reduce((acc, week, index) => {
    if (index % ActivityGraphConfig.number_of_day_in_column === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(week);
    return acc;
  }, [] as Date[][]);
};

export const activityGraphHooks = {
  useActivityGraph,
  useActivityColumns,
};
