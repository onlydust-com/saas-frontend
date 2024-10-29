import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

export type PeriodValue = {
  fromDate?: string;
  toDate?: string;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
  value?: PeriodValue;
  dateRangeType?: DateRangeType;
  size?: ButtonPort<"button">["size"];
}
