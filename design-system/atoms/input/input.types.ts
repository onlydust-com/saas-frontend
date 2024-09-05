import { ComponentPropsWithoutRef, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { IconPort } from "@/design-system/atoms/icon";

type htmlInputProps = Omit<ComponentPropsWithoutRef<"input">, "size">;

export type InputSize = "sm" | "md" | "lg";
interface Variants {
  isDisabled: boolean;
  isError: boolean;
  isFocused: boolean;
  size: InputSize;
}

interface ClassNames {
  container: string;
  base: string;
  input: string;
  label: string;
}

interface DataAttributes {
  "data-hover"?: boolean;
}

export interface InputPort extends htmlInputProps, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  startIcon?: IconPort;
  avatar?: AvatarPort;
  button?: ButtonPort<"button">;
  endContent?: ReactNode;
  endIcon?: IconPort;
  isDisabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  canInteract?: boolean;
  info?: {
    text: string;
    icon?: IconPort;
  };
  error?: {
    text: string;
    icon?: IconPort;
  };
  attr?: DataAttributes;
}
