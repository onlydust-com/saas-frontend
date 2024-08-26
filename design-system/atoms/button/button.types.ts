import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonTheme = "primary" | "destructive";
export type ButtonTextSize = "xs" | "md" | "lg";
export type ButtonTextVariant = "primary" | "secondary";

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

export interface ButtonBaseDefaultPort<C extends ElementType> extends ButtonPort<C> {
  theme?: ButtonTheme;
}

export interface ButtonTextPort<C extends ElementType> extends ButtonBaseDefaultPort<C> {
  isTextButton: true;
  underline: boolean;
  size?: ButtonTextSize;
  variant?: ButtonTextVariant;
}

export type ButtonDefaultPort<C extends ElementType> = ButtonBaseDefaultPort<C> | ButtonTextPort<C>;

export interface ButtonGroupPort
  extends Pick<ButtonBaseDefaultPort<"button">, "theme" | "classNames" | "size" | "isDisabled" | "iconOnly"> {
  buttons: Omit<ButtonBaseDefaultPort<"button">[], "variant">;
  onClick?: (index: number) => void;
}
