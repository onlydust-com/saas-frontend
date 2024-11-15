import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgeIconPort } from "@/design-system/atoms/badge";

interface Variants {}

interface ClassNames {
  base: string;
  header: string;
  titleContainer: string;
  contentContainer: string;
  contentInner: string;
}

type badge = BadgeIconPort<AnyType>;

export interface TimelineItemPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  badgeProps?: Omit<badge, "color" | "icon">;
  icon: badge["icon"];
  color?: badge["color"];
  label?: ReactNode;
  endContent?: ReactNode;
  classNames?: Partial<ClassNames>;
}
