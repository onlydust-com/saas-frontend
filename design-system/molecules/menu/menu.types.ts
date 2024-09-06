import { PropsWithChildren } from "react";

import { MenuItemPort } from "@/design-system/molecules/menu-item";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

export interface MenuPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  items: MenuItemPort[];
  closeOnSelect?: boolean;
  onAction?: (actionId: string) => void;
  selectedIds?: string[];
  onSelect?: (ids: string[], data: MenuItemPort[]) => void;
  placement?: "bottom-start" | "bottom-end";
  onNextPage?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
}
