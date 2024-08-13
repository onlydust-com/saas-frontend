import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { cn } from "@/shared/helpers/cn";

import { CardTransactionPort } from "../../card-transaction.types";
import { getComponentsVariants } from "../../card-transaction.utils";
import { CardTransactionDefaultVariants } from "./default.variants";

export function CardTransactionDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  status,
  date,
  amount: { value, currency, usdEquivalent },
  buttonProps,
}: CardTransactionPort<C>) {
  const slots = CardTransactionDefaultVariants();
  const { icon, statusName } = getComponentsVariants(status);

  const { format: formatDate } = bootstrap.getDateKernelPort();
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
      iconProps={icon}
      descriptionProps={{
        children: formatMoney({
          value: usdEquivalent,
          currency: getUSDCurrency(),
          showTilde: true,
        }),
      }}
      tags={[
        { children: statusName },
        {
          children: formatDate(date, "dd.MM.yyyy"),
          icon: {
            name: "ri-time-line",
          },
        },
      ]}
      endContent={buttonProps && <Button {...buttonProps} size="l" variant="secondary-light" />}
    />
  );
}
