import { Spinner } from "@nextui-org/react";
import { ComponentProps, ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ButtonPort } from "../../button.types";
import { ButtonDefaultVariants } from "./default.variants";

export function ButtonDefaultAdapter<C extends ElementType = "button">({
  classNames,
  as,
  startIcon: StartIcon,
  endIcon: EndIcon,
  startContent,
  endContent,
  children,
  onClick,
  translate,
  type = "button",
  htmlProps,
  isLoading,
  isDisabled,
  size,
  hideText,
  canInteract,
}: ButtonPort<C>) {
  const Component = as || "button";
  const slots = ButtonDefaultVariants({
    isLoading,
    isDisabled,
    hideText,
    size,
    canInteract,
  });

  const showChildren = !hideText && (!!children || !!translate);

  const typoSize: Record<NonNullable<typeof size>, ComponentProps<typeof Typo>["size"]> = {
    s: "xs",
    m: "s",
    l: "s",
    xl: "m",
  };

  return (
    <Component
      {...(htmlProps || {})}
      data-loading={isLoading}
      data-disabled={isDisabled}
      className={cn(slots.base(), classNames?.base)}
      onClick={onClick}
      type={type}
    >
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}
        {!!StartIcon && <StartIcon size={16} className={cn(slots.startIcon(), classNames?.startIcon)} />}
        {showChildren && (
          <Typo size={typoSize[size || "m"]} as={"span"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children || (translate && <Translate {...translate} />)}
          </Typo>
        )}
        {!!EndIcon && <EndIcon size={16} className={cn(slots.endIcon(), classNames?.endIcon)} />}
        {endContent}
      </div>
      {isLoading && (
        <div className={cn(slots.loaderContainer(), classNames?.loaderContainer)}>
          <Spinner
            size={"sm"}
            classNames={{
              wrapper: "flex-row items-center justify-center flex",
              circle1: cn(slots.spinnerCircle(), classNames?.spinnerCircle),
              circle2: cn(slots.spinnerCircle(), classNames?.spinnerCircle),
            }}
          />
        </div>
      )}
    </Component>
  );
}
