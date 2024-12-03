import { DateRangeType } from "@/core/kernel/date/date-facade-port";

export type PeriodValue = {
  from?: string;
  to?: string;
  rangeType: DateRangeType;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
  value: PeriodValue;
}
