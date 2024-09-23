import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";

export interface QuantityFilterValues {
  type?: QuantityFilterType;
  amount?: number;
}
export interface QuantityFilterProps {
  name: string;
  value: QuantityFilterValues;
  onChange?: (v: QuantityFilterValues) => void;
}
