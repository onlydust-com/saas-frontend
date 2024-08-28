import { ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";

interface Variants {}

interface ClassNames {
  base: string;
  inner: string;
}

interface DataAttributes {
  "data-hover"?: boolean;
}

export interface MenuItemBasePort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  id: string;
  label: ReactNode;
  isDisabled?: boolean;
  startContent?: ReactNode;
  showIndicatorOnSelected?: boolean;
  attr?: DataAttributes;
  isSelected?: boolean;
}

export interface MenuItemAvatarPort extends MenuItemBasePort {
  avatar: AvatarPort;
}

export type MenuItemPort = MenuItemBasePort | MenuItemAvatarPort;
