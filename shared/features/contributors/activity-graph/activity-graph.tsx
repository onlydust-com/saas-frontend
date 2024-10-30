import { useLayoutEffect, useMemo, useRef } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Column } from "@/shared/features/contributors/activity-graph/_components/column/column";
import { activityGraphHooks } from "@/shared/features/contributors/activity-graph/activity-graph.hooks";

import { ActivityGraphProps } from "./activity-graph.types";

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
