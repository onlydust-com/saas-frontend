import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

export interface DevActiveCountFilterProps {
  value: QuantityFilterProps["value"];
  onChange?: QuantityFilterProps["onChange"];
}
