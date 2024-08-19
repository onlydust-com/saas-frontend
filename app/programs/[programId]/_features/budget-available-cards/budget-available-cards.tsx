import { useParams } from "next/navigation";

import {
  CreateAvatarGroupProps,
  FinancialCardItemProps,
} from "@/app/programs/[programId]/_features/budget-available-cards/budget-available-cards.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

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

  return (
    <CardFinancial
      title={{ token: title }}
      amount={total.totalUsdEquivalent}
      currency="USD"
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
      <div className="flex h-[220px] gap-2">
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
    <div className="flex h-[220px] gap-2">
      <FinancialCardItem title="programs:budgetAvailable.available.title" total={data.totalAvailable} color="chart-1" />
      <FinancialCardItem title="programs:budgetAvailable.granted.title" total={data.totalGranted} color="chart-2" />
      <FinancialCardItem title="programs:budgetAvailable.rewarded.title" total={data.totalRewarded} color="chart-3" />
    </div>
  );
}
