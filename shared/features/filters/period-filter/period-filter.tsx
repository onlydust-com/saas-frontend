import { Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { PeriodFilterProps } from "@/shared/features/filters/period-filter/period-filter.types";
import { usePeriodSelectOptions } from "@/shared/hooks/select/use-period-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

const START_DEFAULT_DATE = new Date();
START_DEFAULT_DATE.setDate(new Date().getDate() - 20);

export function PeriodFilter({ onChange, value, dateRangeType, size = "sm" }: PeriodFilterProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const [periodType, setPeriodType] = useState<DateRangeType>(DateRangeType.LAST_MONTH);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({ start: START_DEFAULT_DATE, end: new Date() });
  const rangeMenu = usePeriodSelectOptions();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(periodType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [periodType, dateKernelPort]);

  function onChangeRangeType(value: string) {
    if (dateKernelPort.isDateRangeType(value)) setPeriodType(value);
  }

  function handleDateRange(value: DateRangePickerValue) {
    setDateRange(value);
  }

  useEffect(() => {
    if (dateRangeType === DateRangeType.CUSTOM && value?.fromDate && value?.toDate) {
      setPeriodType(DateRangeType.CUSTOM);
      setDateRange({
        start: new Date(value.fromDate),
        end: new Date(value.toDate),
      });
    }
  }, []);

  useEffect(() => {
    if (periodType === DateRangeType.CUSTOM) {
      const { start, end } = dateRange;
      return onChange?.({
        fromDate: start ? dateKernelPort.format(start, "yyyy-MM-dd") : undefined,
        toDate: end ? dateKernelPort.format(end, "yyyy-MM-dd") : undefined,
      });
    }
    onChange?.({ fromDate, toDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, dateRange, dateKernelPort, periodType]);

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={size}
              endIcon={{ component: Calendar }}
              classNames={{
                base: "max-w-xs overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              endContent={<Badge size={"xxs"}>1</Badge>}
            />
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <div className="flex flex-col gap-4">
            <Menu items={rangeMenu} selectedIds={[periodType]} onAction={onChangeRangeType} placement={"bottom-end"}>
              <Button variant={"secondary"} size={"md"} startIcon={{ component: Calendar }}>
                <Translate token={`common:dateRangeType.${periodType}`} />
              </Button>
            </Menu>
            {periodType === DateRangeType.CUSTOM ? (
              <DateRangePicker
                label={
                  <Typo
                    size="xs"
                    color="secondary"
                    translate={{ token: "features:filters.periodDate.periodPickerLabel" }}
                  />
                }
                value={dateRange}
                onChange={handleDateRange}
              />
            ) : null}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
