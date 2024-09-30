import { Placement } from "@floating-ui/react";
import { PropsWithChildren } from "react";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

export interface MenuBasePort<T = string> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  items: MenuItemPort<T>[];
  selectedIds?: MenuItemId<T>[];
  onSelect?: (ids: MenuItemId<T>[], data: MenuItemPort<T>[]) => void;
  onNextPage?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  onAction?: (id: MenuItemId<T>) => void;
  isMultiple?: boolean;
}

export interface ListMenuPort<T = string> extends MenuBasePort<T> {
  isPopOver?: never;
}

export interface PopOverMenuPort<T = string> extends MenuBasePort<T>, PropsWithChildren {
  isPopOver?: true;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnSelect?: boolean;
  placement?: Placement;
}

export type MenuPort<T = string> = ListMenuPort<T> | PopOverMenuPort<T>;
