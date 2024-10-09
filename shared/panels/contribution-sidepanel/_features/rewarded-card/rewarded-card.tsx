import { ArrowRight, Clock } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
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
    <Paper border="primary" size="lg" classNames={{ base: "flex flex-col gap-lg gradient-glass-neon-80" }}>
      <Typo size="sm" weight="medium" translate={{ token: "panels:contribution.rewardedCard.title" }} />

      <div className="flex gap-lg">
        <Avatar src={reward.currency.logoUrl} size="sm" />

        <div className="flex flex-col gap-md">
          <div className="grid">
            <div className="flex items-center gap-xs">
              <Typo size="sm" weight="medium">
                {titleMoney.amount} {titleMoney.code}
              </Typo>

              <Icon component={ArrowRight} classNames={{ base: "text-utility-secondary-blue-500" }} />
            </div>

            <Typo size="xs" color="secondary">
              ~{descriptionMoney.amount} {descriptionMoney.code}
            </Typo>
          </div>

          <div className="flex w-full flex-wrap gap-md">
            <Badge color="brand" size="xs">
              <Translate token="panels:contribution.rewardedCard.status" />
            </Badge>

            <Badge icon={{ component: Clock }} color="brand" size="xs">
              {dateKernelPort.format(new Date(), "dd.MM.yyyy")}
            </Badge>
          </div>
        </div>
      </div>
    </Paper>
  );
}
