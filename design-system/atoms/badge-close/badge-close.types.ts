import { ComponentPropsWithoutRef, ElementType } from "react";

interface Variants {
  shape: "rounded" | "squared";
  size: "xxs" | "xs" | "sm" | "md";
  color: "grey" | "brand" | "error" | "warning" | "success" | "inverse";
  variant: "flat" | "outline" | "solid";
}

interface ClassNames {
  base: string;
  closeIcon: string;
}

export interface BadgeClosePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  onClose?: () => void;
}
