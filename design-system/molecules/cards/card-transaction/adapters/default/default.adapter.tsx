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
  type,
  date,
  amount: { value, currency, usdEquivalent },
  buttonProps,
}: CardTransactionPort<C>) {
  const slots = CardTransactionDefaultVariants();
  const { icon, typeName } = getComponentsVariants(type);
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const titleMoney = moneyKernelPort.format({
    amount: value,
    currency,
  });

  const descriptionMoney = moneyKernelPort.format({
    amount: usdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  return (
    <CardTemplate
      as={as}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      htmlProps={htmlProps}
      avatarProps={{ src: currency.logoUrl }}
      titleProps={{
        children: `${titleMoney.amount} ${titleMoney.code}`,
      }}
      descriptionProps={{
        children: `~${descriptionMoney.amount} ${descriptionMoney.code}`,
      }}
      iconProps={icon}
      tags={[
        { children: typeName },
        {
          children: dateKernelPort.format(new Date(date), "dd.MM.yyyy"),
          icon: {
            name: "ri-time-line",
          },
        },
      ]}
      endContent={buttonProps && <Button {...buttonProps} size="l" variant="secondary-light" />}
    />
  );
}
