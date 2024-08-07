import { Input } from "@nextui-org/input";
import { ForwardedRef, forwardRef } from "react";

import { InputPort } from "@/design-system/atoms/input";
import { InputNextUiVariants } from "@/design-system/atoms/input/adapters/next-ui/next-ui.variants";

import { cn } from "@/shared/helpers/cn";

export const InputNextUiAdapter = forwardRef(function InputNextUiAdapter(
  {
    id,
    name,
    classNames,
    isError,
    isDisabled,
    value,
    onChange,
    startContent,
    endContent,
    label,
    placeholder,
  }: InputPort,
  ref: ForwardedRef<HTMLInputElement>
) {
  const slots = InputNextUiVariants({ isDisabled, isError });
  return (
    <Input
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
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
      disabled={isDisabled}
      isInvalid={isError}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
});
