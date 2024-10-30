import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { bootstrap } from "@/core/bootstrap";
import { GetContributionsPortParams } from "@/core/domain/contribution/contribution-contract.types";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { useTimelineFilterDataSidePanel } from "@/shared/panels/contributor-sidepanel/_components/timeline/filter-data/filter-data.hooks";
import { TimelineAccordion } from "@/shared/panels/contributor-sidepanel/_components/timeline/timeline-accordion/timeline-accordion";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterData } from "./filter-data/filter-data";
import { TimelineProps } from "./timeline.types";

export type TimelineFilters = Omit<NonNullable<GetContributionsPortParams["queryParams"]>, "pageSize" | "pageIndex">;

export function Timeline({ user }: TimelineProps) {
  const { open: openFilter } = useTimelineFilterDataSidePanel();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const [filters, setFilters] = useState<TimelineFilters>({});
  const rangeMenu = useRangeSelectOptions({
    excludedRange: [DateRangeType.ALL_TIME, DateRangeType.LAST_MONTH, DateRangeType.LAST_WEEK],
  });
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);

  function onChangeRangeType(value: string) {
    if (dateKernelPort.isDateRangeType(value)) setRangeType(value);
  }

  const months = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);
    if (from && to) {
      return dateKernelPort
        .eachMonthOfInterval(from, to)
        .map(date => {
          return {
            start: date,
            end: dateKernelPort.endOfMonth(date),
          };
        })
        .reverse();
    }

    return [];
  }, [rangeType]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
        <div className={"flex w-full flex-row items-center justify-between gap-1"}>
          <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.timeline.title" }} />
          <Menu
            items={rangeMenu}
            selectedIds={[rangeType]}
            onAction={onChangeRangeType}
            isPopOver
            closeOnSelect
            placement={"bottom-end"}
          >
            <div>
              <Button
                as={"div"}
                variant={"secondary"}
                size={"md"}
                startIcon={{ component: Calendar }}
                endIcon={{ component: ChevronDown }}
              >
                <Translate token={`common:dateRangeType.${rangeType}`} />
              </Button>
            </div>
          </Menu>
        </div>
        <div>
          <FilterButton onClick={openFilter} />
        </div>
        {months.map((month, i) => (
          <TimelineAccordion
            key={month.start.toISOString()}
            user={user}
            start={month.start}
            end={month.end}
            isFirst={i === 0}
            filters={filters}
          />
        ))}
      </Paper>
      <FilterData user={user} />
    </FilterDataProvider>
  );
}
