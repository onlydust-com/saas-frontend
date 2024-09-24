import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

export interface RewardCountFilterProps {
  value: QuantityFilterProps["value"];
  onChange?: QuantityFilterProps["onChange"];
}
