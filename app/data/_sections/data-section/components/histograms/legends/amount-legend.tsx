import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

export function AmountLegend({ amountSum }: { amountSum: number }) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount, code } = moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") });
  return (
    <div className="flex gap-1">
      <Typo size={"xs"} color={"primary"}>
        {amount}
      </Typo>
      <Typo size={"xs"} color={"primary"}>
        {code}
      </Typo>
    </div>
  );
}
