import { Clock } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

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
    <Paper
      as={as}
      htmlProps={htmlProps}
      size={size}
      background={background}
      border={border}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <Avatar src={currency.logoUrl} size="s" />

      <div className="flex w-full flex-col gap-3 overflow-hidden">
        <div className="flex items-start justify-between gap-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Typo size="sm" weight="medium" color={"primary"}>{`${titleMoney.amount} ${titleMoney.code}`}</Typo>

              {!!iconProps && <Icon {...iconProps} />}
            </div>

            <Typo size="xs" color={"secondary"}>{`~${descriptionMoney.amount} ${descriptionMoney.code}`}</Typo>
          </div>

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
        </div>

        <div className="flex w-full flex-wrap gap-1">
          <Badge color="grey" size="xs">
            {typeName}
          </Badge>
          <Badge icon={{ component: Clock }} color="grey" size="xs">
            {dateKernelPort.format(new Date(date), "dd.MM.yyyy")}
          </Badge>
        </div>
      </div>
    </Paper>
  );
}
