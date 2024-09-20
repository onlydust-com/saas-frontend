import { Placement } from "@floating-ui/react";
import { PropsWithChildren } from "react";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

export interface MenuBasePort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  items: MenuItemPort[];
  selectedIds?: MenuItemId[];
  onSelect?: (ids: MenuItemId[], data: MenuItemPort[]) => void;
  onNextPage?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  onAction?: (id: MenuItemId) => void;
  isMultiple?: boolean;
}

export interface ListMenuPort extends MenuBasePort {
  isPopOver?: never;
}

export interface PopOverMenuPort extends MenuBasePort, PropsWithChildren {
  isPopOver?: true;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnSelect?: boolean;
  placement?: Placement;
}

export type MenuPort = ListMenuPort | PopOverMenuPort;
