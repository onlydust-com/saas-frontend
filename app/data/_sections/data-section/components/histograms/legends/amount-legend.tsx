import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

export function AmountLegend({ amountSum }: { amountSum: number }) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  return (
    <div className="flex gap-1">
      <Typo size={"xs"} color={"primary"}>
        {moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") }).amount}
      </Typo>
      <Typo size={"xs"} color={"primary"}>
        {moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") }).code}
      </Typo>
    </div>
  );
}
