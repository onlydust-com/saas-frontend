import { ElementType } from "react";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TimelineItemPort } from "../../timeline-item.types";
import { TimelineItemDefaultVariants } from "./default.variants";

export function TimelineItemDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  label,
  badgeProps = {},
  color = "brand",
  endContent,
  children,
  icon,
}: TimelineItemPort<C>) {
  const Component = as || "div";
  const slots = TimelineItemDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.header(), classNames?.header)}>
        <div className={cn(slots.titleContainer(), classNames?.titleContainer)}>
          <Badge size={"xs"} color={color} shape={"squared"} {...badgeProps} icon={icon} iconOnly={true} />
          {label ? (
            <Typo size={"xs"} weight={"medium"} as={"div"}>
              {label}
            </Typo>
          ) : null}
        </div>
        {!!endContent && (
          <Typo color={"secondary"} size={"xs"} weight={"regular"} as={"div"}>
            {endContent}
          </Typo>
        )}
      </div>
      {!!children && (
        <div className={cn(slots.contentContainer(), classNames?.contentContainer)}>
          <div className={cn(slots.contentInner(), classNames?.contentInner)}>{children}</div>
        </div>
      )}
    </Component>
  );
}
