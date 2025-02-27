"use client";

import { ArrowRight, Calendar, ChevronDown, MoveDownRight, MoveUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { TimeGroupingMenu } from "@/app/(saas)/data/_components/histograms/menus/time-grouping-menu/time-grouping-menu";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";

import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { AcquisitionFunnelProps } from "./acquisition-funnel.types";

function FunnelStep({
  label,
  currentValue,
  percentDiff,
  diff,
  maxValue,
}: {
  label: string;
  currentValue: number;
  percentDiff: number;
  diff: number;
  maxValue: number;
}) {
  const isDown = percentDiff < 0;
  const maxHeight = 300; // Max container height in pixels
  const height = Math.min((currentValue / maxValue) * maxHeight, maxHeight);
  return (
    <div className="flex h-full flex-1 flex-col gap-2">
      <div className="flex h-[300px] flex-col justify-end overflow-hidden rounded-md bg-purple-950 [background-image:linear-gradient(45deg,rgba(0,0,0,.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,.1)_50%,rgba(0,0,0,.1)_75%,transparent_75%)] [background-size:20px_20px]">
        <div className="w-full bg-purple-600" style={{ height: `${height}px` }} />
      </div>
      <div className="flex flex-col gap-1">
        <TypographyP>{label}</TypographyP>
        <div className="flex flex-row items-center justify-start gap-2">
          <ArrowRight className="h-4 w-4 text-blue-500" />
          <TypographyMuted>{currentValue} users</TypographyMuted>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {isDown ? (
            <MoveDownRight className="h-4 w-4 text-red-500" />
          ) : (
            <MoveUpRight className="h-4 w-4 text-green-500" />
          )}
          <TypographyMuted>
            {diff} users ({percentDiff}%)
          </TypographyMuted>
        </div>
      </div>
    </div>
  );
}

export function AcquisitionFunnel({ projectId }: AcquisitionFunnelProps) {
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

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiProjectAcquisition({
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

  const { globalVisitorCount, projectVisitorCount, applicantCount, assigneeCount, contributorCount } = data ?? {};

  const maxValue = Math.max(
    globalVisitorCount?.value ?? 0,
    projectVisitorCount?.value ?? 0,
    applicantCount?.value ?? 0,
    assigneeCount?.value ?? 0,
    contributorCount?.value ?? 0
  );

  function onChangeRangeType(value: string) {
    setRangeType(value as DateRangeType);
  }

  if (isLoading) {
    return <Skeleton className="min-h-[400px] w-full" />;
  }

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-lg">
        <TypographyH3>Acquisition Funnel</TypographyH3>

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

      <TypographyP>
        This funnel shows how users progress from visitors to active contributors in your project.
      </TypographyP>

      <div className="flex flex-row gap-2">
        <FunnelStep
          label="Global Visitors"
          currentValue={globalVisitorCount?.value ?? 0}
          percentDiff={globalVisitorCount?.percentDiff ?? 0}
          diff={globalVisitorCount?.diff ?? 0}
          maxValue={maxValue}
        />
        <FunnelStep
          label="Project Visitors"
          currentValue={89}
          percentDiff={projectVisitorCount?.percentDiff ?? 0}
          diff={projectVisitorCount?.diff ?? 0}
          maxValue={maxValue}
        />
        <FunnelStep
          label="Applicants"
          currentValue={applicantCount?.value ?? 0}
          percentDiff={applicantCount?.percentDiff ?? 0}
          diff={applicantCount?.diff ?? 0}
          maxValue={maxValue}
        />
        <FunnelStep
          label="Assignees"
          currentValue={assigneeCount?.value ?? 0}
          percentDiff={assigneeCount?.percentDiff ?? 0}
          diff={assigneeCount?.diff ?? 0}
          maxValue={maxValue}
        />
        <FunnelStep
          label="Contributors"
          currentValue={contributorCount?.value ?? 0}
          percentDiff={contributorCount?.percentDiff ?? 0}
          diff={contributorCount?.diff ?? 0}
          maxValue={maxValue}
        />
      </div>
    </Card>
  );
}
