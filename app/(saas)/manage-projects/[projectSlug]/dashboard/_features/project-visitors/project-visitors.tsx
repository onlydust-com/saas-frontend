import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";

import { useAreaSplineChartOptions } from "@/shared/components/charts/highcharts/areaspline-chart/areaspline-chart.hooks";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3 } from "@/shared/ui/typography";

import { useProjectVisitors } from "./project-visitors.hooks";
import { ProjectVisitorsProps } from "./project-visitors.types";

export function ProjectVisitors({ projectId }: ProjectVisitorsProps) {
  const rangeMenu = useRangeSelectOptions();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiProjectVisitors({
    pathParams: {
      projectIdOrSlug: projectId ?? "",
    },
    queryParams: {
      fromDate,
      toDate,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const { stats } = data ?? {};

  const { categories, visitorCountSeries } = useProjectVisitors(stats);

  const { options } = useAreaSplineChartOptions({
    categories,
    series: [{ name: "Visitors", data: visitorCountSeries }],
    legend: { enabled: false },
    tooltip: {
      pointFormatter() {
        return `<div class='flex gap-sm items-center'>
                    <div class='rounded h-3 min-h-3 w-3 min-w-3' style='background-color: ${this.color}'></div> 
                    <div class='text-typography-secondary'>${this.series.name}</div> 
                    <div class='font-medium'>${this.y} visitors</div>
                </div>`;
      },
    },
    height: 300,
  });

  function onChangeRangeType(value: string) {
    setRangeType(value as DateRangeType);
  }

  const renderChart = useMemo(() => {
    if (!categories || !visitorCountSeries) {
      return <EmptyStateLite />;
    }

    return <HighchartsDefault options={options} />;
  }, [categories, visitorCountSeries, options]);

  if (isLoading) {
    return <Skeleton className="min-h-[400px] w-full" />;
  }

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-lg">
        <TypographyH3>Count visitors</TypographyH3>

        <Menu
          items={rangeMenu}
          selectedIds={[rangeType]}
          onAction={onChangeRangeType}
          isPopOver
          placement={"bottom-end"}
        >
          <Button
            variant={"secondary"}
            size={"sm"}
            startIcon={{ component: Calendar }}
            endIcon={{ component: ChevronDown }}
            translate={{ token: `common:dateRangeType.${rangeType}` }}
          />
        </Menu>
      </div>

      {renderChart}
    </Card>
  );
}
