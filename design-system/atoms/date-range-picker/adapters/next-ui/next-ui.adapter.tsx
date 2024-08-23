"use client";

import { parseAbsolute } from "@internationalized/date";
import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import { Calendar } from "lucide-react";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";

import { Icon } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import { DateRangePickerPort } from "../../date-range-picker.types";
import { getErrorMessage } from "../../date-range-picker.utils";
import { DateRangePickerNextUiVariants } from "./next-ui.variants";

const DEFAULT_TZ = "Europe/Paris";

export const DateRangePickerNextUiAdapter = forwardRef(function InputNextUiAdapter(
  { classNames, isError, isDisabled, value, onChange, label, minValue, maxValue }: DateRangePickerPort,
  ref: ForwardedRef<HTMLDivElement>
) {
  const slots = DateRangePickerNextUiVariants({ isDisabled, isError });

  const [formattedValue, setFormattedValue] = useState<RangeValue<DateValue>>();

  useEffect(() => {
    if (!value) return;

    setFormattedValue({
      start: parseAbsolute(value?.start.toISOString(), DEFAULT_TZ),
      end: parseAbsolute(value?.end.toISOString(), DEFAULT_TZ),
    });
  }, [value]);

  function handleChange(value: RangeValue<DateValue>) {
    if (!onChange) return;

    onChange({
      start: value.start.toDate(DEFAULT_TZ),
      end: value.end.toDate(DEFAULT_TZ),
    });
  }

  return (
    <DateRangePicker
      ref={ref}
      classNames={{
        base: cn(slots.base(), classNames?.base),
        inputWrapper: cn(slots.inputWrapper(), classNames?.input),
        innerWrapper: slots.innerWrapper(),
        input: slots.input(),
        label: cn(slots.label(), classNames?.label),
        segment: slots.segment(),
        selectorButton: slots.selectorButton(),
        errorMessage: slots.errorMessage(),
      }}
      calendarProps={{
        classNames: {
          base: "rounded-xl bg-container-1",
          headerWrapper: "bg-container-1 px-3 pt-3 pb-2",
          prevButton: "text-text-1 data-[hover=true]:bg-white/20",
          nextButton: "text-text-1 data-[hover=true]:bg-white/20",
          title: "text-text-1 text-sm font-medium",
          gridHeader: "bg-container-1",
          gridHeaderRow: "px-3 pb-2",
          gridHeaderCell: "text-text-1 text-xs font-medium w-12 px-1",
          gridBody: "px-3",
          gridBodyRow: "first:mt-0",
          cell: "py-1 px-1",
          cellButton:
            "h-10 w-10 text-text-1 data-[disabled=true]:text-text-3 data-[unavailable=true]:text-text-3 data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-text-3 data-[selected=true]:data-[range-selection=true]:before:bg-interactions-white-disabled data-[selected=true]:data-[range-selection=true]:text-text-1 data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-brand-2 data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-text-1 data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-brand-2 data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-text-1 data-[range-start=true]:before:rounded-full data-[selection-start=true]:before:rounded-full data-[range-end=true]:before:rounded-full data-[selection-end=true]:before:rounded-full before:rounded-full",
        },
      }}
      calendarWidth={352}
      label={label}
      variant="bordered"
      labelPlacement="outside-left"
      granularity="day"
      selectorIcon={<Icon component={Calendar} />}
      isDisabled={isDisabled}
      isInvalid={isError}
      onChange={handleChange}
      value={formattedValue}
      minValue={minValue ? parseAbsolute(minValue.toISOString(), DEFAULT_TZ) : undefined}
      maxValue={maxValue ? parseAbsolute(maxValue.toISOString(), DEFAULT_TZ) : undefined}
      errorMessage={validation => getErrorMessage({ validation, minValue, maxValue })}
    />
  );
});
