import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonTextVariant = "primary" | "secondary";
export type ButtonTextSize = "sm" | "md" | "lg";

interface Variants {
  size: ButtonSize;
  variant?: ButtonVariant;
  isDisabled: boolean;
  iconOnly: boolean;
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
}

export type ButtonBaseDefaultPort<C extends ElementType> = ButtonPort<C> & {
  theme?: "primary" | "destructive";
};

export interface ButtonTextPort<C extends ElementType> extends ButtonBaseDefaultPort<C> {
  isTextButton: true;
  underline: boolean;
  size?: ButtonTextSize;
  variant?: ButtonTextVariant;
}

export type ButtonDefaultPort<C extends ElementType> = ButtonBaseDefaultPort<C> | ButtonTextPort<C>;
