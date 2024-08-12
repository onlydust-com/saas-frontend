import { ElementType } from "react";

import { Tag } from "@/design-system/atoms/tag";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { cn } from "@/shared/helpers/cn";
import { USD_CURRENCY, formatCrypto } from "@/shared/helpers/format-crypto";

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

  return (
    <CardTemplate
      as={as}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      htmlProps={htmlProps}
      avatarProps={{ src: currency.logoUrl }}
      titleProps={{
        children: formatCrypto({
          value,
          currency,
        }),
      }}
      descriptionProps={{
        children: formatCrypto({
          value: usdEquivalent,
          currency: USD_CURRENCY,
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
