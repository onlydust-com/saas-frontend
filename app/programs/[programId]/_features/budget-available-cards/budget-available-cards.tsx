import { useParams } from "next/navigation";

import {
  CreateAvatarGroupProps,
  FinancialCardItemProps,
} from "@/app/programs/[programId]/_features/budget-available-cards/budget-available-cards.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { CardFinancial, CardFinancialLoading } from "@/design-system/molecules/card-financial";

function createAvatarGroup({ total }: CreateAvatarGroupProps) {
  return {
    avatars:
      total.totalPerCurrency?.map(currency => ({
        src: currency.currency.logoUrl,
        name: currency.currency.name,
      })) ?? [],
  };
}

function FinancialCardItem({ title, total, color }: FinancialCardItemProps) {
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
        onClick: () => {
          console.log("Open detail panel");
        },
      }}
    />
  );
}

export function BudgetAvailableCards() {
  const { programId = "" } = useParams<{ programId: string }>();
  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  if (isLoading) {
    return (
      <div className="grid min-h-[220px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
        <CardFinancialLoading />
        <CardFinancialLoading />
        <CardFinancialLoading />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="grid min-h-[220px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
      <FinancialCardItem title="programs:budgetAvailable.available.title" total={data.totalAvailable} color="chart-1" />
      <FinancialCardItem title="programs:budgetAvailable.granted.title" total={data.totalGranted} color="chart-2" />
      <FinancialCardItem title="programs:budgetAvailable.rewarded.title" total={data.totalRewarded} color="chart-3" />
    </div>
  );
}
