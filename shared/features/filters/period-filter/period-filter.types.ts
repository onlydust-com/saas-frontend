import { DateRangeType } from "@/core/kernel/date/date-facade-port";
import { AnyType } from "@/core/kernel/types";

import { PopOverMenuPort } from "@/design-system/molecules/menu/menu.types";

export type PeriodValue = {
  from?: string;
  to?: string;
  rangeType: DateRangeType;
};

export interface PeriodFilterProps {
  onChange: (value: PeriodValue) => void;
  value: PeriodValue;
  placement?: PopOverMenuPort<AnyType>["placement"];
}
