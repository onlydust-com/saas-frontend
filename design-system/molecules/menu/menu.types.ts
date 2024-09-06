import { PropsWithChildren } from "react";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

export interface MenuBasePort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  items: MenuItemPort[];
  selectedIds?: string[];
  onSelect?: (ids: string[], data: MenuItemPort[]) => void;
  onNextPage?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  onAction?: (id: string) => void;
}

export interface ListMenuPort extends MenuBasePort {
  isPopOver?: never;
}

export interface PopOverMenuPort extends MenuBasePort, PropsWithChildren {
  isPopOver?: true;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnSelect?: boolean;
}

export type MenuPort = ListMenuPort | PopOverMenuPort;
