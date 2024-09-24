import { Currency } from "@/core/kernel/money/money.types";

import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

export interface BudgetAvailableCountFilterProps {
  value: QuantityFilterProps["value"];
  onChange?: QuantityFilterProps["onChange"];
  currency?: Currency;
}
