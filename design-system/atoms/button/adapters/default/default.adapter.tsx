import { ComponentProps, ElementType } from "react";

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
  hideText,
  canInteract,
}: ButtonPort<C>) {
  const Component = as || "button";
  const slots = ButtonDefaultVariants({
    isDisabled,
    hideText,
    size,
    canInteract,
  });

  const showChildren = !hideText && (!!children || !!translate);

  const typoSize: Record<NonNullable<typeof size>, ComponentProps<typeof Typo>["size"]> = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "md",
  };

  return (
    <Component
      {...(htmlProps || {})}
      data-disabled={isDisabled}
      className={cn(slots.base(), classNames?.base)}
      onClick={onClick}
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
