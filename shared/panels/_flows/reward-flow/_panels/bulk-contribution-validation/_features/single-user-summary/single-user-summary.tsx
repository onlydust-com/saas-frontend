import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Accordion } from "@/design-system/molecules/accordion";

import { Summary } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/summary/summary";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

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

  return (
    <Accordion
      id={`bulk-user-summary-${githubUserId}`}
      titleProps={{ children: `${data.login} • ${money.amount} ${money.code}` }}
      startContent={<Avatar size={"xxs"} shape={"squared"} src={data.avatarUrl} />}
    >
      <div>
        <Summary amount={amount} budget={budget} />
      </div>
    </Accordion>
  );
}
