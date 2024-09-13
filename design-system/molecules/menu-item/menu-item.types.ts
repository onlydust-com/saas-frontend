import { ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {}

interface ClassNames {
  base: string;
  inner: string;
}

interface DataAttributes {
  "data-hover"?: boolean;
}

export type MenuItemId = string;

export interface MenuItemBasePort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  id: MenuItemId;
  label: ReactNode;
  searchValue?: string;
  isDisabled?: boolean;
  startContent?: ReactNode;
  showIndicatorOnSelected?: boolean;
  attr?: DataAttributes;
  isSelected?: boolean;
  onClick?: (id: MenuItemId) => void;
}

export interface MenuItemAvatarPort extends MenuItemBasePort {
  avatar: AvatarPort;
}

export interface MenuItemIconPort extends MenuItemBasePort {
  icon: IconPort;
}

export interface MenuItemCheckboxPort extends MenuItemBasePort {
  isCheckbox?: boolean;
}

export interface MenuItemRadioPort extends MenuItemBasePort {
  isRadio?: boolean;
}

export type MenuItemPort =
  | MenuItemBasePort
  | MenuItemAvatarPort
  | MenuItemIconPort
  | MenuItemCheckboxPort
  | MenuItemRadioPort;
