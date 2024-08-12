import { format } from "date-fns";
import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { cn } from "@/shared/helpers/cn";
import { USD_CURRENCY, formatCrypto } from "@/shared/helpers/format-crypto";

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
      iconProps={icon}
      descriptionProps={{
        children: formatCrypto({
          value: usdEquivalent,
          currency: USD_CURRENCY,
          showTilde: true,
        }),
      }}
      tags={[
        { children: statusName },
        {
          children: format(date, "dd.MM.yyyy"),
          icon: {
            name: "ri-time-line",
          },
        },
      ]}
      endContent={buttonProps && <Button size="l" variant="secondary-light" {...buttonProps} />}
    />
  );
}
