import { Calendar, ChevronDown } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { PeriodFilterProps } from "@/shared/features/filters/period-filter/period-filter.types";
import { usePeriodSelectOptions } from "@/shared/hooks/select/use-period-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function PeriodFilter({ onChange, value }: PeriodFilterProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const rangeMenu = usePeriodSelectOptions();

  function onChangeRangeType(newRange: string) {
    if (dateKernelPort.isDateRangeType(newRange)) {
      if (newRange === DateRangeType.CUSTOM) {
        return onChange?.({
          from: value.from,
          to: value.to,
          rangeType: newRange,
        });
      }

      const { to, from } = dateKernelPort.getRangeOfDates(newRange);
      return onChange?.({
        from: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
        to: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
        rangeType: newRange,
      });
    }
  }

  function onChangeDates(dates: DateRangePickerValue) {
    return onChange?.({
      from: dateKernelPort.format(dates.start, "yyyy-MM-dd"),
      to: dateKernelPort.format(dates.end, "yyyy-MM-dd"),
      rangeType: DateRangeType.CUSTOM,
    });
  }

  function renderCalendar() {
    if (value.rangeType !== DateRangeType.CUSTOM) {
      return null;
    }

    return (
      <div className={"w-full px-md"}>
        <DateRangePicker
          label={
            <Typo size="xs" color="secondary" translate={{ token: "features:filters.periodDate.periodPickerLabel" }} />
          }
          value={{
            start: value.from ? new Date(value.from) : new Date(),
            end: value.to ? new Date(value.to) : dateKernelPort.addDays(new Date(), 2),
          }}
          onChange={onChangeDates}
        />
      </div>
    );
  }

  return (
    <Menu
      items={rangeMenu}
      selectedIds={[value.rangeType]}
      onAction={onChangeRangeType}
      isPopOver
      classNames={{
        content: "max-h-[initial]",
      }}
      endContent={renderCalendar()}
    >
      <Button
        as={"div"}
        variant={"secondary"}
        size={"sm"}
        startIcon={{ component: Calendar }}
        endIcon={{ component: ChevronDown }}
      >
        <Translate token={`common:dateRangeType.${value.rangeType}`} />
      </Button>
    </Menu>
  );
}
