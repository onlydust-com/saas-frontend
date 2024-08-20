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
  classNames?: Partial<ClassNames>;
  onChange?: (value: DateRangePickerValue) => void;
  value?: DateRangePickerValue;
  label?: ReactNode;
  minValue?: Date;
  maxValue?: Date;
}
