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
  size?: InputPort["size"];
  label?: InputPort["label"];
  description?: InputPort["description"];
  isError?: InputPort["isError"];
  isPopover?: boolean;
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
  isMultiple?: MenuPort["isMultiple"];
}

export interface SelectExtendedProps extends SelectInputProps {
  isDisabled?: boolean;
  isAutoComplete?: boolean;
  isMultiple?: MenuPort["isMultiple"];
}

export interface SelectPort<C extends ElementType> extends Partial<Variants>, SelectExtendedProps, SelectProps {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  controlledAutoComplete?: {
    onChange?: (value: string) => void;
    value?: string;
  };
}
