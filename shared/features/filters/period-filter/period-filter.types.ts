import { DateRangeType } from "@/core/kernel/date/date-facade-port";

export type PeriodValue = {
  fromDate?: string;
  toDate?: string;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
  value?: PeriodValue;
  dateRangeType?: DateRangeType;
}
