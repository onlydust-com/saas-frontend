import { ContributionFilterType } from "@/core/kernel/filters/filters-facade-port";

import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

type QuantityFilterValue = NonNullable<QuantityFilterProps["value"]>;

type QuantityFilterType = {
  eq?: number;
  gte?: number;
  lte?: number;
};

export interface ContributionsActivityFilterValue extends QuantityFilterValue {
  contributionType: ContributionFilterType[];
}

export function getContributionFilterType(v: {
  prCount?: QuantityFilterType;
  issueCount?: QuantityFilterType;
  codeReviewCount?: QuantityFilterType;
}) {
  const types: ContributionFilterType[] = [];

  if (v.prCount) {
    types.push(ContributionFilterType.PULL_REQUESTS);
  }
  if (v.issueCount) {
    types.push(ContributionFilterType.ISSUES);
  }
  if (v.codeReviewCount) {
    types.push(ContributionFilterType.CODE_REVIEWS);
  }
  return types;
}
