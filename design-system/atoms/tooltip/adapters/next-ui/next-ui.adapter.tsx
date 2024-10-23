import { Tooltip as NextUiTooltip } from "@nextui-org/tooltip";
import { ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TooltipPort } from "../../tooltip.types";
import { TooltipNextUiVariants } from "./next-ui.variants";

export function TooltipNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  content,
  htmlProps,
  enabled = true,
  canInteract = false,
  children,
  title,
  placement = "top",
}: TooltipPort<C>) {
  const Component = as || "div";
  const slots = TooltipNextUiVariants();

  if (!enabled) {
    return (
      <Component {...htmlProps} className={cn(slots.wrapper(), classNames?.wrapper)}>
        {children}
      </Component>
    );
  }

  return (
    <NextUiTooltip
      content={
        <div className={"flex w-full max-w-[224px] flex-col gap-xs"}>
          {!!title && (
            <Typo size={"xs"} weight={"medium"} as={"div"} classNames={{ base: "text-components-tooltip-title" }}>
              {title}
            </Typo>
          )}
          <Typo size={"xs"} as={"div"} classNames={{ base: "text-components-tooltip-typo" }}>
            {content}
          </Typo>
        </div>
      }
      closeDelay={50}
      shouldCloseOnBlur
      classNames={{
        base: cn("before:bg-background-primary-solid", { "pointer-events-none": !canInteract }),
        content: cn(slots.tooltip(), classNames?.tooltip),
      }}
      placement={placement}
    >
      <Component {...htmlProps} className={cn(slots.wrapper(), classNames?.wrapper)}>
        {children}
      </Component>
    </NextUiTooltip>
  );
}
