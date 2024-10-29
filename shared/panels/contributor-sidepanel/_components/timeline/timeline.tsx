import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { TimelineAccordion } from "@/shared/panels/contributor-sidepanel/_components/timeline/timeline-accordion/timeline-accordion";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TimelineProps } from "./timeline.types";

export function Timeline({ user }: TimelineProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const rangeMenu = useRangeSelectOptions({
    excludedRange: [DateRangeType.ALL_TIME, DateRangeType.LAST_MONTH, DateRangeType.LAST_WEEK],
  });
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);
  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

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
      {months.map((month, i) => (
        <TimelineAccordion
          key={month.start.toISOString()}
          user={user}
          start={month.start}
          end={month.end}
          isFirst={i === 0}
        />
      ))}
    </Paper>
  );
}
