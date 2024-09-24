import { ContributionFilterType } from "@/core/kernel/filters/filters-facade-port";

import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

type QuantityFilterValue = QuantityFilterProps["value"];

export interface ContributionsActivityFilterValue extends QuantityFilterValue {
  contributionType: ContributionFilterType[];
}

export interface ContributionsActivityFilterProps {
  value?: ContributionsActivityFilterValue;
  onChange?: (value: ContributionsActivityFilterValue) => void;
}
