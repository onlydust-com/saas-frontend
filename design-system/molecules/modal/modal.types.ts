import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { ButtonDefaultPort } from "@/design-system/atoms/button/button.types";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  background: "primary" | "gradient";
}

interface ClassNames {
  modal: string;
  body: string;
  backdrop: string;
  header: string;
  footer: string;
  wrapper: string;
}

type placement = "bottom" | "center";

export interface ModalPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  classNames?: Partial<ClassNames>;
  titleProps?: Partial<TypoPort<"h6">>;
  closeButtonProps?: ButtonDefaultPort<"button">;
  hideHeader?: boolean;
  placement?: placement;
  footer?: {
    startContent?: ReactNode;
    endContent?: ReactNode;
  };
  canDismiss?: boolean;
}
