import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

export interface MenuItemPort {
  id: string;
  label: string;
}

export interface MenuPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  items: MenuItemPort[];
}
