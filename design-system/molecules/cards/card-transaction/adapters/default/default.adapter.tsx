import { Clock } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
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
  badgeProps,
  buttonProps,
  size = "xl",
  background = "secondary",
  border = "primary",
}: CardTransactionPort<C>) {
  const slots = CardTransactionDefaultVariants();
  const { iconProps, typeName } = getComponentsVariants(type);
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
      htmlProps={htmlProps}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      size={size}
      background={background}
      border={border}
      avatarProps={{
        src: currency.logoUrl,
      }}
      titleProps={{
        classNames: { base: "flex gap-xs items-center" },
        children: (
          <>
            {`${titleMoney.amount} ${titleMoney.code}`}
            {!!iconProps && <Icon {...iconProps} />}
          </>
        ),
      }}
      descriptionProps={{
        children: `~${descriptionMoney.amount} ${descriptionMoney.code}`,
      }}
      actionSlot={
        <>
          {buttonProps && (
            <Button
              {...buttonProps}
              size="md"
              variant="secondary"
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
            />
          )}

          {badgeProps && (
            <Badge
              {...badgeProps}
              size="md"
              shape="squared"
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
            />
          )}
        </>
      }
      contentSlot={
        <div className="flex w-full flex-wrap gap-xs pl-4xl">
          <Badge color="grey" size="xs">
            {typeName}
          </Badge>

          <Badge icon={{ component: Clock }} color="grey" size="xs">
            {dateKernelPort.format(new Date(date), "dd.MM.yyyy")}
          </Badge>
        </div>
      }
    />
  );
}
