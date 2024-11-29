import { ArrowDown, ArrowRight, Undo2 } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Icon, IconPort } from "@/design-system/atoms/icon";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { cn } from "@/shared/helpers/cn";

import { CardBudgetPort, CardBudgetType } from "../../card-budget.types";
import { CardBudgetDefaultVariants } from "./default.variants";

export function CardBudgetDefaultAdapter<C extends ElementType = "div">({
  amount: { value, currency, usdEquivalent },
  badgeProps,
  type,
  size = "lg",
  background = "secondary",
  border = "primary",
  isError = false,
  ...props
}: CardBudgetPort<C>) {
  const slots = CardBudgetDefaultVariants({ type, isError });

  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const titleMoney = moneyKernelPort.format({
    amount: value,
    currency,
  });

  const descriptionMoney = moneyKernelPort.format({
    amount: usdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  const iconComponents: Record<CardBudgetType, NonNullable<IconPort["component"]>> = {
    [CardBudgetType.GRANTED]: ArrowRight,
    [CardBudgetType.RECEIVED]: ArrowDown,
    [CardBudgetType.UNGRANTED]: Undo2,
  };

  return (
    <CardTemplate
      {...props}
      size={size}
      background={background}
      border={border}
      avatarProps={{
        src: currency.logoUrl,
      }}
      titleProps={{
        classNames: { base: cn("flex gap-xs items-center", slots.title()) },
        children: (
          <>
            {`${titleMoney.amount} ${titleMoney.code}`}
            {type ? <Icon component={iconComponents[type]} classNames={{ base: slots.icon() }} /> : null}
          </>
        ),
      }}
      descriptionProps={{
        classNames: { base: slots.description() },
        children: `~${descriptionMoney.amount} ${descriptionMoney.code}`,
      }}
      actionSlot={badgeProps ? <Badge size="md" color={"grey"} {...badgeProps} /> : null}
    />
  );
}
