import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Column } from "@/shared/features/contributors/activity-graph/_components/column/column";
import { activityGraphHooks } from "@/shared/features/contributors/activity-graph/activity-graph.hooks";

import { ActivityGraphProps } from "./activity-graph.types";

export function ActivityGraph({ children }: ActivityGraphProps) {
  const grid = activityGraphHooks.useActivityGraph();
  const flatDays = grid.months.flatMap(month => month.days);
  const columns = activityGraphHooks.useActivityColumns(flatDays);

  return (
    <div className={"w-full overflow-hidden"}>
      <ScrollView>
        <div className={"flex flex-row gap-[2px]"}>
          {columns.map((column, index) => (
            <Column days={column} key={index} />
          ))}
        </div>
      </ScrollView>
    </div>
  );
}
