import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Menu } from "@/design-system/molecules/menu";

import { useDefaultPeriod } from "@/shared/features/filters/period-filter/period-filter.hooks";
import { PeriodFilterProps } from "@/shared/features/filters/period-filter/period-filter.types";
import { usePeriodSelectOptions } from "@/shared/hooks/select/use-period-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function PeriodFilter({ onChange, value, dateRangeType }: PeriodFilterProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const defaultPeriod = useDefaultPeriod();
  const [rangeType, setRangeType] = useState<DateRangeType>(defaultPeriod.rangeType);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>(defaultPeriod.range);
  const rangeMenu = usePeriodSelectOptions();

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

  useEffect(() => {
    if (dateRangeType === DateRangeType.CUSTOM && value?.fromDate && value?.toDate) {
      setRangeType(DateRangeType.CUSTOM);
      setDateRange({
        start: new Date(value.fromDate),
        end: new Date(value.toDate),
      });
    }
  }, []);

  useEffect(() => {
    if (rangeType === DateRangeType.CUSTOM) {
      const { start, end } = dateRange;
      return onChange?.({
        fromDate: start ? dateKernelPort.format(start, "yyyy-MM-dd") : undefined,
        toDate: end ? dateKernelPort.format(end, "yyyy-MM-dd") : undefined,
      });
    }
    onChange?.({ fromDate, toDate });
  }, [fromDate, toDate, dateRange, dateKernelPort, rangeType]);

  return (
    <Menu
      items={rangeMenu}
      selectedIds={[rangeType]}
      onAction={onChangeRangeType}
      isPopOver
      classNames={{
        content: "max-h-64",
      }}
    >
      <Button
        as={"div"}
        variant={"secondary"}
        size={"sm"}
        startIcon={{ component: Calendar }}
        endIcon={{ component: ChevronDown }}
      >
        <Translate token={`common:dateRangeType.${rangeType}`} />
      </Button>
    </Menu>
  );
}
