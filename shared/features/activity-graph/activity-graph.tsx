"use client";

import { useMemo } from "react";

import { Row } from "./_components/row/row";
import { ActivityGraphLoading } from "./activity-graph.loading";
import { ActivityGraphProps } from "./activity-graph.types";
import { useActivityGraph } from "./use-activity-graph";

export function ActivityGraph<T>({ endDate, weekData, isLoading }: ActivityGraphProps<T>) {
  const { splitWeeks } = useActivityGraph({ endDate });

  const data = useMemo(() => {
    return weekData || {};
  }, [weekData]);

  if (!splitWeeks?.length || isLoading) {
    return <ActivityGraphLoading />;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      {splitWeeks.map((weeks, index) => (
        <Row
          key={index}
          weeks={weeks}
          data={data}
          asLabel={index % 2 !== 1}
          isLastRow={index === splitWeeks.length - 1}
        />
      ))}
    </div>
  );
}
