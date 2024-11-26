import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { PeriodFilter } from "@/shared/features/filters/period-filter/period-filter";
import { PeriodValue } from "@/shared/features/filters/period-filter/period-filter.types";
import { ProgramEcosystemPopover } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover";

import { GlobalDataFilterProps } from "./global-data-filter.types";

export function GlobalDataFilter({ children }: GlobalDataFilterProps) {
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);
  const [period, setPeriod] = useState<PeriodValue>();
  const searchParams = useSearchParams();

  const dateRangeTypeParam = useMemo(() => {
    return searchParams.get("dateRangeType") as DateRangeType;
  }, [searchParams]);

  const plotPeriodParam = useMemo(() => {
    return {
      fromDate: searchParams.get("plotPeriodFrom") ?? undefined,
      toDate: searchParams.get("plotPeriodTo") ?? undefined,
    };
  }, [searchParams]);

  function handleOnPeriodChange({ fromDate, toDate }: PeriodValue) {
    setPeriod({ fromDate, toDate });
  }
  return (
    <div className={"flex flex-row items-center justify-end"}>
      <PeriodFilter
        onChange={handleOnPeriodChange}
        value={{ fromDate: plotPeriodParam?.fromDate, toDate: plotPeriodParam?.toDate }}
        dateRangeType={dateRangeTypeParam}
      />
      <ProgramEcosystemPopover
        name={"programAndEcosystem"}
        onSelect={setSelectedProgramAndEcosystem}
        selectedProgramsEcosystems={selectedProgramAndEcosystem}
        buttonProps={{ size: "sm" }}
        searchParams={"programAndEcosystemIds"}
      />
    </div>
  );
}
