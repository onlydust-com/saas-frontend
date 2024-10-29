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
  background = "primary-solid",
}: TooltipPort<C>) {
  const Component = as || "div";
  const slots = TooltipNextUiVariants({ background });

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
            <Typo
              size={"xs"}
              weight={"medium"}
              as={"div"}
              classNames={{
                base: cn({
                  "text-components-tooltip-title": background === "primary-solid",
                  "text-typography-primary": background === "primary",
                }),
              }}
            >
              {title}
            </Typo>
          )}
          <Typo
            size={"xs"}
            as={"div"}
            classNames={{
              base: cn({
                "text-components-tooltip-typo": background === "primary-solid",
                "text-typography-secondary": background === "primary",
              }),
            }}
          >
            {content}
          </Typo>
        </div>
      }
      closeDelay={50}
      shouldCloseOnBlur
      classNames={{
        base: cn({
          "pointer-events-none": !canInteract,
          "before:bg-background-primary-solid": background === "primary-solid",
          "before:bg-background-primary": background === "primary",
        }),
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
