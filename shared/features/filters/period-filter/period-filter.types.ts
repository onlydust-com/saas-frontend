import { ButtonPort } from "@/design-system/atoms/button/button.types";

export type PeriodValue = {
  fromDate?: string;
  toDate?: string;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
  value?: string;
  size?: ButtonPort<"button">["size"];
}
