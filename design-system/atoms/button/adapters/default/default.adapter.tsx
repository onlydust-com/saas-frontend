import { Spinner } from "@nextui-org/react";
// import { RenderWithProps } from "components/layout/components-utils/render-with-props/render-with-props";
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
        <RenderWithProps
          Component={Icon}
          props={startIcon}
          overrideProps={{ className: cn(slots.startIcon(), classNames?.startIcon, startIcon?.className) }}
        />
        {showChildren && (
          <Typo size={typoSize[size || "m"]} as={"span"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children || <RenderWithProps Component={Translate} props={translate} />}
          </Typo>
        )}
        <RenderWithProps
          Component={Icon}
          props={endIcon}
          overrideProps={{ className: cn(slots.endIcon(), classNames?.endIcon, endIcon?.className) }}
        />
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
