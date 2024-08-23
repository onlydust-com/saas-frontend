import { ComponentPropsWithoutRef, ElementType } from "react";

interface Variants {
  color: "grey" | "brand" | "error" | "warning" | "success";
  shape: "rounded" | "squared";
}

interface ClassNames {
  base: string;
  closeIcon: string;
}

export interface BadgeClosePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  onClose: () => void;
}
