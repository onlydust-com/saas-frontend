import { subDays } from "date-fns";
import { useLayoutEffect, useMemo, useRef } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Column } from "@/shared/features/contributors/activity-graph/_components/column/column";
import { activityGraphHooks } from "@/shared/features/contributors/activity-graph/activity-graph.hooks";

import { ActivityGraphProps } from "./activity-graph.types";

const mock = [
  {
    year: 2023,
    week: 34,
    date: new Date().toISOString(),
    codeReviewCount: 1,
    issueCount: 1,
    pullRequestCount: 1,
    rewardCount: 1,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 1).toISOString(),
    codeReviewCount: 2,
    issueCount: 2,
    pullRequestCount: 1,
    rewardCount: 1,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 2).toISOString(),
    codeReviewCount: 3,
    issueCount: 3,
    pullRequestCount: 1,
    rewardCount: 0,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 4).toISOString(),
    codeReviewCount: 4,
    issueCount: 4,
    pullRequestCount: 1,
    rewardCount: 0,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 5).toISOString(),
    codeReviewCount: 5,
    issueCount: 5,
    pullRequestCount: 1,
    rewardCount: 0,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 6).toISOString(),
    codeReviewCount: 6,
    issueCount: 6,
    pullRequestCount: 1,
    rewardCount: 0,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 7).toISOString(),
    codeReviewCount: 7,
    issueCount: 7,
    pullRequestCount: 1,
    rewardCount: 0,
  },
  {
    year: 2023,
    week: 34,
    date: subDays(new Date(), 8).toISOString(),
    codeReviewCount: 8,
    issueCount: 8,
    pullRequestCount: 1,
    rewardCount: 0,
  },
];

export function ActivityGraph({ data = [] }: ActivityGraphProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const ref = useRef<HTMLDivElement>(null);
  const grid = activityGraphHooks.useActivityGraph();
  const flatDays = grid.months.flatMap(month => month.days);
  const columns = activityGraphHooks.useActivityColumns(flatDays);
  const range = useMemo(() => data?.map(activity => activity.count) || [], []);
  const months = activityGraphHooks.useGetMonthsSeparator(flatDays);
  const levelRange = activityGraphHooks.useCreateLevel(range);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }, [columns, ref]);

  return (
    <div className={"w-full overflow-hidden"}>
      <ScrollView ref={ref}>
        <div className={"flex flex-col gap-1"}>
          <div className={"flex flex-row"}>
            {months?.map((month, index) => (
              <div
                key={index}
                style={{
                  width: `calc(1.125rem*${month.col})`,
                  minWidth: `calc(1.125rem*${month.col})`,
                }}
              >
                <Typo size={"xs"} color={"tertiary"} classNames={{ base: "min-w-full w-full" }}>
                  {dateKernelPort.format(month.month, "MMM")}
                </Typo>
              </div>
            ))}
          </div>
          <div className={"flex flex-row gap-[2px]"}>
            {columns.map((column, index) => (
              <Column data={data} levelRange={levelRange} days={column} key={index} />
            ))}
          </div>
        </div>
      </ScrollView>
    </div>
  );
}
