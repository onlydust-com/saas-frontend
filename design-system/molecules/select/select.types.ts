import { ComponentPropsWithoutRef, ElementType } from "react";

import { InputPort } from "@/design-system/atoms/input";
import { MenuPort } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

interface Variants {}

interface ClassNames {
  base: string;
}

interface InputProps {
  placeholder?: InputPort["placeholder"];
  info?: InputPort["info"];
  error?: InputPort["error"];
  label?: InputPort["label"];
  description?: InputPort["description"];
}

interface SelectProps {
  closeOnSelect?: string;
  selectedIds?: MenuPort["selectedIds"];
  onSelect?: (ids: string[]) => void;
  items: MenuItemPort[];
  onNextPage?: MenuPort["onNextPage"];
  hasNextPage?: MenuPort["hasNextPage"];
  isLoading?: MenuPort["isLoading"];
}

export interface SelectPort<C extends ElementType> extends Partial<Variants>, SelectProps, InputProps {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  isDisabled?: boolean;
  isAutoComplete?: boolean;
  autoComplete?: {
    onChange?: (value: string) => void;
    value?: string;
  };
}
