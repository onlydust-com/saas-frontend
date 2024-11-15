import { ComponentPropsWithoutRef, ElementType } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgeIconPort } from "@/design-system/atoms/badge";
import { TimelineItemPort } from "@/design-system/organisms/timeline-item";

interface Variants {}

interface ClassNames {
  base: string;
  borderContainer: string;
  border: string;
}

type badge = BadgeIconPort<AnyType>;

export interface TimelinePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  badgeProps?: Omit<badge, "color" | "icon">;
  items: TimelineItemPort<AnyType>[];
}
