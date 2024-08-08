import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { ButtonDefaultPort } from "@/design-system/atoms/button/button.types";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {
  size: "m" | "l";
  container: "1" | "2" | "3" | "4";
}

interface ClassNames {
  modal: string;
  body: string;
  backdrop: string;
  header: string;
  footer: string;
}

export interface ModalPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  classNames?: Partial<ClassNames>;
  titleProps?: Partial<TypoPort<"h6">>;
  closeButtonProps?: ButtonDefaultPort<"button">;
  footer?: {
    startContent?: ReactNode;
    endContent?: ReactNode;
  };
  canDismiss?: boolean;
}
