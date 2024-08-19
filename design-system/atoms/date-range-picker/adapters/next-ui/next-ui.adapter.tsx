import { DateRangePicker } from "@nextui-org/react";
import { ForwardedRef, forwardRef } from "react";

import { cn } from "@/shared/helpers/cn";

import { DateRangePickerPort } from "../../date-range-picker.types";
import { DateRangePickerNextUiVariants } from "./next-ui.variants";

export const DateRangePickerNextUiAdapter = forwardRef(function InputNextUiAdapter(
  { id, name, classNames, isError, isDisabled, value, onChange, label, placeholder }: DateRangePickerPort,
  ref: ForwardedRef<HTMLDivElement>
) {
  const slots = DateRangePickerNextUiVariants({ isDisabled, isError });

  return (
    <DateRangePicker
      ref={ref}
      id={id}
      name={name}
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
      disabled={isDisabled}
      isInvalid={isError}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
});
