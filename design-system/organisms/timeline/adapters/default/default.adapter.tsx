import { CircleDashed } from "lucide-react";
import { ElementType } from "react";

import { TimelineItem } from "@/design-system/organisms/timeline-item";

import { cn } from "@/shared/helpers/cn";

import { TimelinePort } from "../../timeline.types";
import { TimelineDefaultVariants } from "./default.variants";

export function TimelineDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  badgeProps = {},
  items,
}: TimelinePort<C>) {
  const Component = as || "div";
  const slots = TimelineDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.borderContainer(), classNames?.borderContainer)}>
        <TimelineItem
          badgeProps={badgeProps}
          color={"success"}
          icon={{ component: CircleDashed }}
          classNames={{ base: "opacity-0 pointer-events-none" }}
        />
        <div className={cn(slots.border(), classNames?.border)} />
      </div>
      {items.map((item, index) => (
        <TimelineItem key={index} badgeProps={badgeProps} {...item} />
      ))}
    </Component>
  );
}
