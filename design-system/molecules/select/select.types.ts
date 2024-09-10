import { ComponentPropsWithoutRef, ElementType } from "react";

import { InputPort } from "@/design-system/atoms/input";
import { MenuPort } from "@/design-system/molecules/menu";
import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface SelectInputProps {
  placeholder?: InputPort["placeholder"];
  info?: InputPort["info"];
  error?: InputPort["error"];
  label?: InputPort["label"];
  description?: InputPort["description"];
  isError?: InputPort["isError"];
  name: string;
}

interface SelectProps {
  closeOnSelect?: boolean;
  selectedIds?: MenuPort["selectedIds"];
  onSelect?: (ids: MenuItemId[]) => void;
  items: MenuItemPort[];
  onNextPage?: MenuPort["onNextPage"];
  hasNextPage?: MenuPort["hasNextPage"];
  isLoading?: MenuPort["isLoading"];
}

export interface SelectPort<C extends ElementType> extends Partial<Variants>, SelectProps, SelectInputProps {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  isDisabled?: boolean;
  isAutoComplete?: boolean;
  controlledAutoComplete?: {
    onChange?: (value: string) => void;
    value?: string;
  };
}
