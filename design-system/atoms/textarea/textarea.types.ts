import { ComponentPropsWithoutRef, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

// Should use the `textarea` HTML element, but we're using `input` to please NextUI for now
type htmlTextareaProps = ComponentPropsWithoutRef<"input">;

interface Variants {
  isDisabled: boolean;
  isError: boolean;
}

interface ClassNames {
  container: string;
  label: string;
  base: string;
  inputWrapper: string;
  innerWrapper: string;
  input: string;
}

export interface TextareaPort extends htmlTextareaProps, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  isDisabled?: boolean;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  value?: string;
  isError?: boolean;
  placeholder?: string;
  label?: ReactNode;
  description?: ReactNode;
  info?: {
    text: string;
    icon?: IconPort;
  };
  error?: {
    text: string;
    icon?: IconPort;
  };
}
