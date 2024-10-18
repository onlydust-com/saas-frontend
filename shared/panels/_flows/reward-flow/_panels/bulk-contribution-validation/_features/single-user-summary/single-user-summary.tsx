import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";

import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { SingleUserSummaryProps } from "./single-user-summary.types";

export function SingleUserSummary({ githubUserId }: SingleUserSummaryProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { getAmount } = useRewardFlow();
  const { amount, budget } = getAmount(githubUserId);
  const money = moneyKernelPort.format({
    amount: parseFloat(amount),
    currency: budget?.currency,
  });

  const { data, isLoading, isError } = UserReactQueryAdapter.client.useGetUserById({
    pathParams: { githubId: githubUserId },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  if (isLoading) {
    return <Skeleton classNames={{ base: "h-[72px]" }} />;
  }

  if (!data || isError || !budget) return null;

  const usdConversionRate = budget.usdConversionRate ?? 0;
  const allocatedAmount = parseFloat(amount);
  const newBudgetBalance = budget.amount - allocatedAmount;

  return (
    <CardBudgetAccordion
      defaultSelected={[`bulk-user-summary-${githubUserId}`]}
      items={[
        {
          id: `bulk-user-summary-${githubUserId}`,
          titleProps: {
            children: `${data.login} • ${money.amount} ${money.code}`,
          },
          startContent: <Avatar size={"xxs"} shape={"squared"} src={data.avatarUrl} />,
          cards: [
            {
              amount: {
                value: budget.amount,
                currency: budget.currency,
                usdEquivalent: budget.usdEquivalent ?? 0,
              },
              badgeProps: {
                children: <Translate token={"panels:singleContributionValidation.summary.currentBalance"} />,
              },
            },
            {
              amount: {
                value: allocatedAmount,
                currency: budget.currency,
                usdEquivalent: allocatedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:singleContributionValidation.summary.allocated"} /> },
              type: CardBudgetType.GRANTED,
            },
            {
              amount: {
                value: newBudgetBalance,
                currency: budget.currency,
                usdEquivalent: newBudgetBalance * usdConversionRate,
              },
              badgeProps: {
                children: <Translate token={"panels:singleContributionValidation.summary.finalBalance"} />,
              },
              isError: newBudgetBalance < 0,
            },
          ],
        },
      ]}
      multiple
    />
  );
}
