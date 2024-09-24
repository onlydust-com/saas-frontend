import { ReactNode } from "react";

import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

export interface GrantedCountFilterProps {
  value: QuantityFilterProps["value"];
  onChange?: QuantityFilterProps["onChange"];
  unit?: ReactNode;
}
