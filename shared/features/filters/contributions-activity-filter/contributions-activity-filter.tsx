import { useTranslation } from "react-i18next";

import { ContributionFilterType, QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";

import { Menu, MenuPort } from "@/design-system/molecules/menu";

import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";
import { QuantityFilterProps } from "@/shared/features/filters/quantity-filter/quantity-filter.types";

import { ContributionsActivityFilterProps } from "./contributions-activity-filter.types";

export function ContributionsActivityFilter({
  value = {
    contributionType: [ContributionFilterType.ISSUES],
    amount: 0,
    type: QuantityFilterType.EQUAL,
  },
  onChange,
}: ContributionsActivityFilterProps) {
  const { t } = useTranslation("common");

  const contributionsOptions: MenuPort["items"] = [
    {
      label: t("contributionFilterType.PULL_REQUESTS"),
      id: ContributionFilterType.PULL_REQUESTS,
    },
    {
      label: t("contributionFilterType.ISSUES"),
      id: ContributionFilterType.ISSUES,
    },
    {
      label: t("contributionFilterType.CODE_REVIEWS"),
      id: ContributionFilterType.CODE_REVIEWS,
    },
  ];

  function onQuantityChange(newValue: QuantityFilterProps["value"]) {
    onChange?.({
      ...value,
      ...newValue,
    });
  }

  function onContributionTypeChange(newValue: string[]) {
    onChange?.({
      ...value,
      contributionType: newValue as ContributionFilterType[],
    });
  }

  return (
    <AccordionFilter
      name={"total-rewarded-amount"}
      title={{ translate: { token: "features:filters.contributionActivity.title" } }}
      selected={value.amount ? 1 : 0}
      classNames={{ container: "!p-0" }}
    >
      <div className={"p-lg"}>
        <Menu
          items={contributionsOptions}
          selectedIds={value?.contributionType}
          onSelect={onContributionTypeChange}
          isMultiple={true}
        />
      </div>

      <div className={"border-t-1 border-border-primary p-lg"}>
        <QuantityFilter
          name={"total-rewarded-amount"}
          value={{ amount: value?.amount, type: value?.type }}
          onChange={onQuantityChange}
        />
      </div>
    </AccordionFilter>
  );
}
