"use client";

import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";

import { bootstrap } from "@/core/bootstrap";

import { cn } from "@/shared/helpers/cn";

import { DateRangePickerPort } from "../../date-range-picker.types";
import { DateRangePickerNextUiVariants } from "./next-ui.variants";

export const DateRangePickerNextUiAdapter = forwardRef(function InputNextUiAdapter(
  { id, classNames, isError, isDisabled, value, onChange, label }: DateRangePickerPort,
  ref: ForwardedRef<HTMLDivElement>
) {
  const slots = DateRangePickerNextUiVariants({ isDisabled, isError });

  const dateKernelPort = bootstrap.getDateKernelPort();

  const [formattedValue, setFormattedValue] = useState<RangeValue<DateValue>>();

  useEffect(() => {
    if (!value) return;

    setFormattedValue({
      start: parseDate(dateKernelPort.format(value?.start, "yyyy-MM-dd")),
      end: parseDate(dateKernelPort.format(value?.end, "yyyy-MM-dd")),
    });
  }, [dateKernelPort, value]);

  function handleChange(value: RangeValue<DateValue>) {
    if (!onChange) return;

    onChange({
      start: value.start.toDate(getLocalTimeZone()),
      end: value.end.toDate(getLocalTimeZone()),
    });
  }

  return (
    <DateRangePicker
      ref={ref}
      id={id}
      classNames={{
        base: cn(slots.base(), classNames?.base),
        mainWrapper: cn(slots.mainWrapper()),
        inputWrapper: cn(slots.inputWrapper(), classNames?.input),
        innerWrapper: cn(slots.innerWrapper()),
        input: cn(slots.input()),
        errorMessage: cn(slots.errorMessage()),
        label: cn(slots.label(), classNames?.label),
        helperWrapper: cn(slots.helperWrapper()),
        description: cn(slots.description()),
      }}
      label={label}
      variant="bordered"
      labelPlacement="outside-left"
      isDisabled={isDisabled}
      isInvalid={isError}
      onChange={handleChange}
      value={formattedValue}
    />
  );
});
