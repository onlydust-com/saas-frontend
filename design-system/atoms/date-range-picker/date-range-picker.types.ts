import { ComponentPropsWithoutRef, ReactNode } from "react";

type htmlInputProps = ComponentPropsWithoutRef<"input">;

interface Variants {
  isDisabled: boolean;
  isError: boolean;
}

interface ClassNames {
  base: string;
  input: string;
  label: string;
}

export interface DateRangePickerPort extends htmlInputProps, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  value?: string;
  isError?: boolean;
  isDisabled?: boolean;
  label?: ReactNode;
  placeholder?: string;
}
