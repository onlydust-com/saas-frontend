import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Variants {
  size: "xs" | "sm" | "md" | "lg";
  isDisabled: boolean;
  hideText: boolean;
}

interface ClassNames {
  base: string;
  content: string;
  startIcon: string;
  endIcon: string;
  label: string;
  loaderContainer: string;
  spinnerCircle: string;
}

export interface ButtonPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: Omit<ComponentPropsWithoutRef<C>, "type">;
  classNames?: Partial<ClassNames>;
  translate?: TranslateProps;
  as?: C;
  startIcon?: IconPort;
  endIcon?: IconPort;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onClick?: () => void;
  type?: HTMLButtonElement["type"];
  canInteract?: boolean;
  variant: "primary" | "secondary" | "tertiary";
}

export type ButtonDefaultPort<C extends ElementType> = ButtonPort<C> & {
  color?: "default" | "destructive";
};
