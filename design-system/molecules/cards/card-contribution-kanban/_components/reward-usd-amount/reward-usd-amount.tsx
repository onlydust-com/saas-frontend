import { CircleDollarSign } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";

import { RewardUsdAmountProps } from "./reward-usd-amount.types";

export function RewardUsdAmount({ rewardUsdAmount }: RewardUsdAmountProps) {
  if (!rewardUsdAmount) return null;

  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { amount, code } = moneyKernelPort.format({
    amount: rewardUsdAmount,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  return (
    <Badge
      color={"grey"}
      size={"xxs"}
      icon={{
        component: CircleDollarSign,
        classNames: { base: "text-components-badge-success-backgroundoutline-fg" },
      }}
    >
      {amount} {code}
    </Badge>
  );
}
