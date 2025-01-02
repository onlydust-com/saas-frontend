import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {}

interface ClassNames {
  base: string;
}

interface ExtendableProps {
  badgeProps?: BadgePort<AnyType>;
}

export interface BadgePopoverItemPort {
  onSelect?: () => void;
  isSelected?: boolean;
  content: ReactNode | ((props: Omit<BadgePopoverItemPort, "content">) => ReactNode);
}

export interface BadgePopoverPort<C extends ElementType> extends Partial<Variants>, ExtendableProps {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: ReactNode;
  count?: number;
  content?: ReactNode;
  icon?: IconPort;
  items: BadgePopoverItemPort[];
}
