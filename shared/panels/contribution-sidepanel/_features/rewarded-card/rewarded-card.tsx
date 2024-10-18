import { Clock } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardedCardProps } from "./rewarded-card.types";

export function RewardedCard({ reward }: RewardedCardProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const titleMoney = moneyKernelPort.format({
    amount: reward.amount,
    currency: reward.currency,
  });

  const descriptionMoney = moneyKernelPort.format({
    amount: reward.usdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  return (
    <Paper border="primary" size="lg" classNames={{ base: "flex flex-col gap-lg app_gradient overflow-hidden" }}>
      <div className="relative z-[1] flex flex-col gap-3xl">
        <div className="flex justify-between gap-lg">
          <Typo size="sm" weight="medium" translate={{ token: "panels:contribution.rewardedCard.title" }} />
          <div className="flex w-full flex-wrap justify-end gap-md">
            <Badge color="grey" size="xs">
              <Translate token="panels:contribution.rewardedCard.status" />
            </Badge>

            <Badge icon={{ component: Clock }} color="grey" size="xs">
              {dateKernelPort.format(new Date(), "dd.MM.yyyy")}
            </Badge>
          </div>
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
