import { bootstrap } from "@/core/bootstrap";

import { ActivityGraphConfig } from "@/shared/features/contributors/activity-graph/activity-graph.constants";

const useActivityGraphRange = ({ start, end }: { start?: Date; end?: Date }) => {
  const dateKernel = bootstrap.getDateKernelPort();
  if (start) {
    return {
      from: start,
      to: dateKernel.addYears(dateKernel.addDays(start, 1), ActivityGraphConfig.number_of_years),
    };
  }

  if (end) {
    return {
      from: dateKernel.subYears(dateKernel.addDays(end, 1), ActivityGraphConfig.number_of_years),
      to: end,
    };
  }

  return {
    from: dateKernel.subYears(dateKernel.addDays(new Date(), 1), ActivityGraphConfig.number_of_years),
    to: new Date(),
  };
};

const useActivityGraphGrid = ({ from, to }: { from: Date; to: Date }): { months: { month: Date; days: Date[] }[] } => {
  const dateKernel = bootstrap.getDateKernelPort();
  const months = dateKernel.eachMonthOfInterval(from, to);

  return {
    months: months?.map(month => {
      if (dateKernel.isSameMonth(month, to)) {
        return {
          month,
          days: dateKernel.eachDayOfInterval(dateKernel.startOfMonth(month), to),
        };
      }

      if (dateKernel.isSameMonth(month, from)) {
        return {
          month,
          days: dateKernel.eachDayOfInterval(from, dateKernel.endOfMonth(month)),
        };
      }

      return {
        month,
        days: dateKernel.eachDayOfInterval(dateKernel.startOfMonth(month), dateKernel.endOfMonth(month)),
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
