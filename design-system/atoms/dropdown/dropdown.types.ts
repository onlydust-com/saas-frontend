import { DropdownItemProps, DropdownMenuProps, DropdownProps } from "@nextui-org/react";
import { ElementType, PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

type Base = Partial<Omit<DropdownProps, "children">>;
type MenuProps = Partial<Omit<DropdownMenuProps, "children">>;
export interface DropdownItemType extends DropdownItemProps {
  isError?: boolean;
  isWarning?: boolean;
}

export interface DropdownPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren, Base {
  as?: C;
  items: DropdownItemType[];
  MenuProps?: MenuProps;
  classNames?: Partial<ClassNames>;
}
