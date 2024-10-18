import { ComponentProps, ElementType, SyntheticEvent, useMemo } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Spinner } from "@/design-system/atoms/spinner";
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
  isLoading,
  ...restProps
}: ButtonPort<C>) {
  const Component = as || "button";
  const slots = ButtonDefaultVariants({
    isDisabled,
    iconOnly,
    size,
    canInteract,
    isLoading,
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
    if (!isDisabled && !isLoading) {
      onNativeClick?.(e);
      onClick?.();
    }
  }

  const StartIcon = useMemo(() => {
    if (isLoading) {
      return (
        <Spinner
          classNames={{
            base: cn(classNames?.spinner),
            circle: classNames?.spinnerCircle,
          }}
        />
      );
    }

    if (startIcon) {
      return (
        <Icon
          {...startIcon}
          classNames={{
            base: cn(slots.startIcon(), classNames?.startIcon),
          }}
        />
      );
    }

    return null;
  }, [startIcon, isLoading]);

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
        {StartIcon}
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
        {StartIcon}
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
