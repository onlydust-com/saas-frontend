import { ComponentProps, ElementType, SyntheticEvent } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ButtonPort } from "../../button.types";
import { ButtonDefaultVariants } from "./default.variants";

export function ButtonDefaultAdapter<C extends ElementType = "button">({
  classNames,
  as,
  startIcon,
  endIcon,
  startContent,
  endContent,
  children,
  onClick,
  translate,
  type = "button",
  htmlProps,
  isDisabled,
  size,
  iconOnly,
  canInteract,
  onNativeClick,
  ...restProps
}: ButtonPort<C>) {
  const Component = as || "button";
  const slots = ButtonDefaultVariants({
    isDisabled,
    iconOnly,
    size,
    canInteract,
  });

  const showChildren = !!children || !!translate;

  const typoSize: Record<NonNullable<typeof size>, ComponentProps<typeof Typo>["size"]> = {
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "md",
  };

  function handleClick(e: SyntheticEvent) {
    e?.stopPropagation();
    if (!isDisabled) {
      onNativeClick?.(e);
      onClick?.();
    }
  }

  if (iconOnly && startIcon) {
    return (
      <Component
        {...(restProps || {})}
        {...(htmlProps || {})}
        data-disabled={isDisabled}
        className={cn(slots.base(), classNames?.base)}
        onClick={handleClick}
        type={type}
      >
        <Icon
          {...(startIcon || {})}
          classNames={{
            base: cn(slots.startIcon(), classNames?.startIcon),
          }}
        />
      </Component>
    );
  }

  return (
    <Component
      {...(restProps || {})}
      {...(htmlProps || {})}
      data-disabled={isDisabled}
      className={cn(slots.base(), classNames?.base)}
      onClick={handleClick}
      type={type}
    >
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}
        {!!startIcon && (
          <Icon
            {...startIcon}
            classNames={{
              base: cn(slots.startIcon(), classNames?.startIcon),
            }}
          />
        )}
        {showChildren && (
          <Typo size={typoSize[size || "md"]} as={"span"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children || (translate && <Translate {...translate} />)}
          </Typo>
        )}
        {!!endIcon && <Icon {...endIcon} classNames={{ base: cn(slots.endIcon(), classNames?.endIcon) }} />}
        {endContent}
      </div>
    </Component>
  );
}
