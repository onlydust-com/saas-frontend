import { ContributionUnion } from "@/core/kernel/filters/filters-facade-port";

import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

type QuantityFilterValue = NonNullable<QuantityFilterProps["value"]>;

export interface ContributionsActivityFilterValue extends QuantityFilterValue {
  contributionType: ContributionUnion[];
}

export interface ContributionsActivityFilterProps {
  value?: ContributionsActivityFilterValue;
  onChange?: (value: ContributionsActivityFilterValue) => void;
}
