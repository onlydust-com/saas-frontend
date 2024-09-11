import { ComponentPropsWithoutRef } from "react";

import { FieldContainerPort } from "@/design-system/atoms/field-container";

// Should use the `textarea` HTML element, but we're using `input` to please NextUI for now
type htmlTextareaProps = Omit<ComponentPropsWithoutRef<"input">, "name">;

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

export interface TextareaPort extends htmlTextareaProps, Partial<Variants>, FieldContainerPort {
  classNames?: Partial<ClassNames>;
  isDisabled?: boolean;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  value?: string;
  isError?: boolean;
  placeholder?: string;
}
