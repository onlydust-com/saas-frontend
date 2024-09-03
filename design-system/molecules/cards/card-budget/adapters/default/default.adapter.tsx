import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CardBudgetPort } from "../../card-budget.types";
import { CardBudgetDefaultVariants } from "./default.variants";

export function CardBudgetDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  amount: { value, currency, usdEquivalent },
  badgeContent,
  onClick,
}: CardBudgetPort<C>) {
  const slots = CardBudgetDefaultVariants({ clickable: Boolean(onClick) });
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
      background={"secondary"}
      border={"primary"}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      onClick={onClick}
    >
      <Avatar src={currency.logoUrl} size="s" />

      <div className="flex w-full flex-col gap-3 overflow-hidden">
        <div className="flex items-start justify-between gap-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Typo size="sm" weight="medium" color={"primary"}>{`${titleMoney.amount} ${titleMoney.code}`}</Typo>
            </div>

            <Typo size="xs" color={"secondary"}>
              {`~${descriptionMoney.amount} ${descriptionMoney.code}`}
            </Typo>
          </div>

          {badgeContent ? (
            <Badge size="md" color={"grey"}>
              {badgeContent}
            </Badge>
          ) : null}
        </div>
      </div>
    </Paper>
  );
}
