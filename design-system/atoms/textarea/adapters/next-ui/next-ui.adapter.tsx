import { Textarea as NextTextarea } from "@nextui-org/react";
import { ForwardedRef, forwardRef } from "react";

import { FieldContainer } from "@/design-system/atoms/field-container";

import { cn } from "@/shared/helpers/cn";

import { TextareaPort } from "../../textarea.types";
import { TextareaNextUiVariants } from "./next-ui.variants";

export const TextareaNextUiAdapter = forwardRef(function TextareaNextUiAdapter(
  {
    id,
    name,
    classNames,
    onChange,
    value,
    minRows,
    maxRows,
    disableAutosize,
    isDisabled,
    isError,
    description,
    label,
    info,
    error,
    placeholder,
  }: TextareaPort,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const slots = TextareaNextUiVariants({ isDisabled, isError });

  return (
    <FieldContainer name={name} isError={isError} label={label} description={description} info={info} error={error}>
      <NextTextarea
        ref={ref}
        id={id}
        name={name}
        classNames={{
          base: cn(slots.base(), classNames?.base),
          inputWrapper: cn(slots.inputWrapper(), classNames?.inputWrapper),
          innerWrapper: cn(slots.innerWrapper(), classNames?.innerWrapper),
          input: cn(slots.input(), classNames?.input),
        }}
        variant="bordered"
        isDisabled={isDisabled}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        minRows={minRows}
        maxRows={maxRows}
        disableAutosize={disableAutosize}
        placeholder={placeholder}
      />
    </FieldContainer>
  );
});
