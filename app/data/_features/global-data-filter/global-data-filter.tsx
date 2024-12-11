import { useGlobalDataFilter } from "@/app/data/_features/global-data-filter/global-data-filter.context";

import { PeriodFilter } from "@/shared/features/filters/period-filter/period-filter";
import { ProgramEcosystemPopover } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover";

export function GlobalDataFilter() {
  const { selectedProgramAndEcosystem, setSelectedProgramAndEcosystem, period, setPeriod } = useGlobalDataFilter();

  return (
    <div className={"flex flex-row items-center justify-end gap-2"}>
      <ProgramEcosystemPopover
        name={"programAndEcosystem"}
        onSelect={setSelectedProgramAndEcosystem}
        selectedProgramsEcosystems={selectedProgramAndEcosystem}
        buttonProps={{ size: "sm" }}
        searchParams={"programAndEcosystemIds"}
      />
      <PeriodFilter onChange={setPeriod} value={period} placement={"bottom-end"} />
    </div>
  );
}
