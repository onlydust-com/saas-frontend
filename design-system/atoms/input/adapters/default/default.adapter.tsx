import { CircleAlert } from "lucide-react";
import { ChangeEvent, ComponentProps, ForwardedRef, forwardRef, useMemo, useState } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { isButtonSolid, isButtonText } from "@/design-system/atoms/button/button.utils";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { InputPort } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { InputDefaultVariants } from "./default.variants";

const defaultSize = "md";

function LabelsContainer({
  label,
  description,
  classNames,
  name,
}: Pick<InputPort, "label" | "description" | "classNames" | "name">) {
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

function InfoContainer({ error, info, isError }: Pick<InputPort, "info" | "error" | "isError">) {
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

function StartContent({
  startContent,
  startIcon,
  avatar,
  size = defaultSize,
  ...variants
}: Pick<InputPort, "startContent" | "startIcon" | "avatar" | "size" | "isFocused" | "isError" | "isDisabled">) {
  const slots = InputDefaultVariants(variants);
  const hasStartContent = startContent || startIcon || avatar;
  const avatarSize: Record<NonNullable<typeof size>, ComponentProps<typeof Avatar>["size"]> = {
    sm: "xxs",
    md: "xs",
    lg: "s",
  };

  if (!hasStartContent) {
    return null;
  }

  return (
    <div className={cn(slots.contentWrapper())}>
      <div className={"flex flex-row items-center justify-start gap-1"}>
        {startContent}
        {startIcon ? <Icon size={"sm"} {...startIcon} /> : null}
        {avatar ? <Avatar size={avatarSize[size]} {...avatar} /> : null}
      </div>
    </div>
  );
}

function EndContent({
  endIcon,
  endContent,
  button,
  ...variants
}: Pick<InputPort, "button" | "endContent" | "endIcon" | "size" | "isFocused" | "isError" | "isDisabled">) {
  const slots = InputDefaultVariants(variants);

  const isInnerButton = useMemo(() => {
    if (button) {
      if (isButtonText(button)) {
        return true;
      }
    }

    return false;
  }, [button]);

  const hasEndContent = endIcon || endContent || isInnerButton;

  if (!hasEndContent) {
    return null;
  }

  if (isInnerButton) {
    return <Button {...button} isDisabled={variants?.isDisabled} />;
  }

  return (
    <div className={cn(slots.contentWrapper())}>
      <div className={"flex flex-row items-center justify-end gap-1"}>
        {endContent}
        {endIcon ? <Icon size={"sm"} {...endIcon} /> : null}
      </div>
    </div>
  );
}

export const InputDefaultAdapter = forwardRef(function InputDefaultAdapter(
  {
    id,
    name,
    classNames,
    isError,
    isDisabled,
    value,
    onChange,
    startContent,
    startIcon,
    avatar,
    endContent,
    info,
    error,
    description,
    endIcon,
    label,
    placeholder,
    canInteract = true,
    button,
    attr = {},
    size = defaultSize,
    isFocused: _isFocused,
  }: InputPort,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [isFocused, setIsFocused] = useState(false);
  const isOuterButton = useMemo(() => {
    if (button) {
      if (isButtonSolid(button)) {
        return button.variant === "secondary";
      }
    }

    return false;
  }, [button]);

  const variants = { isFocused: isFocused || _isFocused, size, isDisabled, isError, asOuterElement: isOuterButton };
  const slots = InputDefaultVariants(variants);

  function onFocus() {
    setIsFocused(true);
  }

  function onBlur() {
    setIsFocused(false);
  }

  function handleChanges(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div className={cn(slots.container(), classNames?.container)} {...attr}>
      <LabelsContainer label={label} description={description} classNames={classNames} />
      <div className={cn(slots.wrapper())} {...attr}>
        <div className={cn(slots.base(), classNames?.base)} {...attr}>
          <StartContent startContent={startContent} startIcon={startIcon} avatar={avatar} {...variants} />
          <div className={cn(slots.inputWrapper())}>
            <input
              name={name}
              id={id}
              ref={ref}
              className={cn(slots.input(), classNames?.input, { "pointer-events-none": isDisabled || !canInteract })}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              disabled={isDisabled || !canInteract}
              onChange={handleChanges}
            />
          </div>
          <EndContent endContent={endContent} endIcon={endIcon} button={button} {...variants} />
        </div>
        {isOuterButton && button ? (
          <Button {...button} size={size} classNames={{ base: "rounded-l-none !border-l-0" }} isDisabled={isDisabled} />
        ) : null}
      </div>
      <InfoContainer isError={isError} info={info} error={error} />
    </div>
  );
});
