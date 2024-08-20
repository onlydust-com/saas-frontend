import { ReactNode } from "react";

interface Variants {}

interface ClassNames {
  base: string;
  content: string;
}

export interface DropdownItemType {
  isError?: boolean;
  isWarning?: boolean;
  key: string;
  label: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
}

export interface DropdownPort extends Partial<Variants> {
  items: DropdownItemType[];
  classNames?: Partial<ClassNames>;
  selectedKeys?: string[];
  onChange?: (keys: string[], data: DropdownItemType[]) => void;
  children?: (p: { label?: string }) => ReactNode;
  isMultipleSelection?: boolean;
  multipleSelectionCountLabel?: string;
}
