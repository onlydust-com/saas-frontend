import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Tag } from "@/design-system/atoms/tag";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { cn } from "@/shared/helpers/cn";

import { CardBudgetPort } from "../../card-budget.types";
import { CardBudgetDefaultVariants } from "./default.variants";

export function CardBudgetDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  amount: { value, currency, usdEquivalent },
  budgetPercentage,
}: CardBudgetPort<C>) {
  const slots = CardBudgetDefaultVariants();

  const { format: formatMoney, getUSDCurrency } = bootstrap.getMoneyKernelPort();

  return (
    <CardTemplate
      as={as}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      htmlProps={htmlProps}
      avatarProps={{ src: currency.logoUrl }}
      titleProps={{
        children: formatMoney({
          value,
          currency,
        }),
      }}
      descriptionProps={{
        children: formatMoney({
          value: usdEquivalent,
          currency: getUSDCurrency(),
          showTilde: true,
        }),
      }}
      endContent={
        budgetPercentage && (
          <Tag color="white" size="s" style="outline">
            {budgetPercentage}%
          </Tag>
        )
      }
    />
  );
}
