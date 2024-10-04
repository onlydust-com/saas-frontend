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

interface SelectProps<T = string> {
  selectedIds?: MenuPort<T>["selectedIds"];
  onSelect?: (ids: MenuItemId<T>[]) => void;
  items: MenuItemPort<T>[];
  initialItems?: MenuItemPort<T>[];
  onNextPage?: MenuPort<T>["onNextPage"];
  hasNextPage?: MenuPort<T>["hasNextPage"];
  isLoading?: MenuPort<T>["isLoading"];
  isMultiple?: MenuPort<T>["isMultiple"];
}

export interface SelectExtendedProps<T = string> extends SelectInputProps {
  isDisabled?: boolean;
  isAutoComplete?: boolean;
  isMultiple?: MenuPort["isMultiple"];
  closeOnSelect?: boolean;
  onAction?: MenuPort<T>["onAction"];
  disabledAutoOrdering?: boolean;
}

export interface SelectPort<T = string> extends Partial<Variants>, SelectExtendedProps<T>, SelectProps<T> {
  classNames?: Partial<ClassNames>;
  controlledAutoComplete?: {
    onChange?: (value: string) => void;
    value?: string;
  };
}
