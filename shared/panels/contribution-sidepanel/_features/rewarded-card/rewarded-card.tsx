import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { RewardedCardProps } from "./rewarded-card.types";

export function RewardedCard({ reward, processedAt, requestedAt }: RewardedCardProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const titleMoney = moneyKernelPort.format({
    amount: reward.prettyAmount,
    currency: reward.currency,
  });

  const descriptionMoney = moneyKernelPort.format({
    amount: reward.usdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function renderDates() {
    const date = processedAt ?? requestedAt;

    if (date) {
      return (
        <>
          <Badge color="grey" size="xs">
            {dateKernelPort.format(new Date(date), "h:mma O")}
          </Badge>

          <Badge color="grey" size="xs">
            {dateKernelPort.format(new Date(date), "dd MMM yyyy")}
          </Badge>
        </>
      );
    }

    return null;
  }

  return (
    <Paper
      border="primary"
      size="lg"
      classNames={{ base: "flex flex-col gap-lg app-gradient overflow-hidden shrink-0" }}
    >
      <div className="relative z-[1] flex flex-col gap-3xl">
        <div className="flex justify-between gap-lg">
          <Typo size="sm" weight="medium" translate={{ token: "panels:contribution.rewardedCard.title" }} />
          <div className="flex w-full flex-wrap justify-end gap-md">{renderDates()}</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Typo size="md" variant={"heading"} weight="medium">
            {titleMoney.amount} {titleMoney.code}
          </Typo>
          <Typo size="md" color="secondary">
            ~{descriptionMoney.amount} {descriptionMoney.code}
          </Typo>
        </div>
      </div>
    </Paper>
  );
}
