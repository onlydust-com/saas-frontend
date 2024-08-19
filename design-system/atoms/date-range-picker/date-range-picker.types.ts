import { ReactNode } from "react";

interface Variants {
  isDisabled: boolean;
  isError: boolean;
}

interface ClassNames {
  base: string;
  input: string;
  label: string;
}

interface DateRangePickerValue {
  start: Date;
  end: Date;
}

export interface DateRangePickerPort extends Partial<Variants> {
  id?: string;
  classNames?: Partial<ClassNames>;
  onChange?: (value: DateRangePickerValue) => void;
  value?: DateRangePickerValue;
  label?: ReactNode;
}
