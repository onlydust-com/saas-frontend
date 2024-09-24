import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";
import { Currency } from "@/core/kernel/money/money.types";

export interface QuantityFilterValues {
  type?: QuantityFilterType;
  amount?: number;
}
export interface QuantityFilterProps {
  name: string;
  value?: QuantityFilterValues;
  onChange?: (v: QuantityFilterValues) => void;
  currency?: Currency;
}
