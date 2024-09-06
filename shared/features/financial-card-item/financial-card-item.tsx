import { bootstrap } from "@/core/bootstrap";

import { CardFinancial } from "@/design-system/molecules/cards/card-financial/variants/card-financial-default";

import {
  CreateAvatarGroupProps,
  FinancialCardItemProps,
} from "@/shared/features/financial-card-item/financial-card-item.types";

function createAvatarGroup({ total }: CreateAvatarGroupProps) {
  return {
    avatars:
      total.totalPerCurrency?.map(currency => ({
        src: currency.currency.logoUrl,
        name: currency.currency.name,
      })) ?? [],
  };
}

export function FinancialCardItem({ title, total, color, onClick }: FinancialCardItemProps) {
  const avatarGroup = createAvatarGroup({ total });
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  return (
    <CardFinancial
      title={{ token: title }}
      amount={
        moneyKernelPort.format({ amount: total.totalUsdEquivalent, currency: moneyKernelPort.getCurrency("USD") })
          .amount
      }
      currency={moneyKernelPort.getCurrency("USD").code}
      avatarGroup={avatarGroup}
      color={color}
      cta={{
        onClick,
      }}
    />
  );
}
