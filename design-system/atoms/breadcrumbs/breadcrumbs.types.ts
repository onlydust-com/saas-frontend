import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

interface ClassNames {
  base: string;
}

interface BreadcrumbItemBase {
  id: string;
  label: ReactNode;
  selected?: boolean;
  iconProps?: IconPort;
  iconOnly?: boolean;
}

interface BreadcrumbItemLink extends BreadcrumbItemBase {
  href?: string;
  onClick?: never;
}

interface BreadcrumbItemButton extends BreadcrumbItemBase {
  href?: never;
  onClick?: () => void;
}

export type BreadcrumbItemPort = BreadcrumbItemLink | BreadcrumbItemButton;

export interface BreadcrumbsPort {
  items: BreadcrumbItemPort[];
  classNames?: Partial<ClassNames>;
}
