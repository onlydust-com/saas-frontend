import { Textarea as NextTextarea } from "@nextui-org/react";
import { CircleAlert } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TextareaPort } from "../../textarea.types";
import { TextareaNextUiVariants } from "./next-ui.variants";

function LabelsContainer({
  label,
  description,
  classNames,
  name,
}: Pick<TextareaPort, "label" | "description" | "classNames" | "name">) {
  if (!description && !label) {
    return null;
  }
  return (
    <div className="flex w-full flex-col">
      {label ? (
        <Typo
          as={"label"}
          htmlProps={{ htmlFor: name }}
          size={"sm"}
          weight={"medium"}
          classNames={{ base: classNames?.label }}
        >
          {label}
        </Typo>
      ) : null}
      {description ? (
        <Typo as={"div"} size={"sm"} color={"secondary"}>
          {description}
        </Typo>
      ) : null}
    </div>
  );
}

function InfoContainer({ error, info, isError }: Pick<TextareaPort, "info" | "error" | "isError">) {
  if (isError && error) {
    return (
      <div className="flex w-full flex-row items-center justify-start gap-sm text-foreground-error">
        <Icon size={"sm"} {...(error.icon || {})} component={error?.icon?.component || CircleAlert} />
        {error.text ? (
          <Typo as={"div"} size={"sm"} color={"error"}>
            {error.text}
          </Typo>
        ) : null}
      </div>
    );
  }

  if (info) {
    return (
      <div className="flex w-full flex-row items-center justify-start gap-sm text-foreground-secondary">
        {info.icon ? <Icon size={"sm"} {...info.icon} /> : null}
        {info.text ? (
          <Typo as={"div"} size={"sm"} color={"secondary"}>
            {info.text}
          </Typo>
        ) : null}
      </div>
    );
  }

  return null;
}

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
    <div className={cn(slots.container(), classNames?.container)}>
      <LabelsContainer label={label} description={description} classNames={classNames} />
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
      <InfoContainer isError={isError} info={info} error={error} />
    </div>
  );
});
