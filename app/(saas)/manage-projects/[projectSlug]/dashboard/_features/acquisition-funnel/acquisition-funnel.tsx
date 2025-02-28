"use client";

import { ArrowRight, MoveDownRight, MoveUpRight } from "lucide-react";
import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
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
  const maxHeight = 300; // Max container height in pixels
  const height = Math.min((currentValue / maxValue) * maxHeight, maxHeight);

  const renderArrow = useMemo(() => {
    if (diff === 0) {
      return <ArrowRight className="h-4 w-4 text-blue-500" />;
    }

    if (diff > 0) {
      return <MoveUpRight className="h-4 w-4 text-green-500" />;
    }

    return <MoveDownRight className="h-4 w-4 text-red-500" />;
  }, [percentDiff]);

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
          {renderArrow}
          <TypographyMuted>
            {diff} users ({percentDiff}%)
          </TypographyMuted>
        </div>
      </div>
    </div>
  );
}

export function AcquisitionFunnel({ projectId }: AcquisitionFunnelProps) {
  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiProjectAcquisition({
    pathParams: {
      projectIdOrSlug: projectId ?? "",
    },
    options: {
      enabled: Boolean(projectId),
      retry: 1,
    },
  });

  const { globalVisitorCount, projectVisitorCount, applicantCount, assigneeCount, contributorCount } = data ?? {};

  const renderChart = useMemo(() => {
    if (
      !globalVisitorCount ||
      !projectVisitorCount ||
      !applicantCount ||
      !assigneeCount ||
      !contributorCount ||
      isError
    ) {
      return <EmptyStateLite className="min-h-[200px]" />;
    }

    const maxValue = Math.max(
      globalVisitorCount?.value ?? 0,
      projectVisitorCount?.value ?? 0,
      applicantCount?.value ?? 0,
      assigneeCount?.value ?? 0,
      contributorCount?.value ?? 0
    );

    return (
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
          currentValue={projectVisitorCount?.value ?? 0}
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
    );
  }, [globalVisitorCount, projectVisitorCount, applicantCount, assigneeCount, contributorCount, isError]);

  if (isLoading) {
    return <Skeleton className="min-h-[400px] w-full" />;
  }

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-lg">
        <TypographyH3>Acquisition Funnel</TypographyH3>
      </div>

      <TypographyP>
        This funnel shows how users progress from visitors to active contributors in your project (90 days max).
      </TypographyP>

      {renderChart}
    </Card>
  );
}

// TODO: This is all we need to enable date selection
// State stuff

// const rangeMenu = useRangeSelectOptions();
// const dateKernelPort = bootstrap.getDateKernelPort();
// const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);

// const { fromDate, toDate } = useMemo(() => {
//   const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

//   return {
//     fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
//     toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
//   };
// }, [rangeType, dateKernelPort]);

// Add query params
// queryParams: {
//     fromDate,
//     toDate,
//   },

// Handler
// function onChangeRangeType(value: string) {
//     setRangeType(value as DateRangeType);
//   }

// Menu
{
  /* <Menu
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
</Menu>  */
}
