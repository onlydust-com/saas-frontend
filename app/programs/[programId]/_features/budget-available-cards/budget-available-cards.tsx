import { useParams } from "next/navigation";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { ProgramResponse } from "@/core/domain/program/models/program-model";

import { CardFinancial, CardFinancialLoading } from "@/design-system/molecules/card-financial";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

function createAvatarGroup(total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"]) {
  return {
    avatars:
      total.totalPerCurrency?.map(currency => ({
        src: currency.currency.logoUrl,
        name: currency.currency.name,
      })) ?? [],
  };
}

function FinancialCardItem({
  title,
  total,
  color,
}: {
  title: TranslateProps["token"];
  total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"];
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
}) {
  const avatarGroup = createAvatarGroup(total);

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
