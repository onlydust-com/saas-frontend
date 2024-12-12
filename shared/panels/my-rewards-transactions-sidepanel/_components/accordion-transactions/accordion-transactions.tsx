import { useMemo } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";

import { TransactionsWrapper } from "@/shared/features/transactions/transactions-wrapper/transactions-wrapper";
import { AccordionTransactionsProps } from "@/shared/panels/my-rewards-transactions-sidepanel/_components/accordion-transactions/accordion-transactions.types";
import { useMyRewardsTransactionsContext } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.context";
import { MyRewardsTransactionsContextFilterType } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.types";

export function AccordionTransactions({ date }: AccordionTransactionsProps) {
  const { githubUserId, queryParams } = useMyRewardsTransactionsContext();

  const dateKernelPort = bootstrap.getDateKernelPort();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getMonthRange(date);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [date, dateKernelPort]);

  const { data, isLoading } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      ...queryParams,
      recipientIds: [githubUserId],
      fromDate,
      toDate,
      pageSize: 10000,
    },
  });

  const flatTransactions = useMemo(() => data?.pages.flatMap(({ rewards }) => rewards) ?? [], [data]);

  const transactions = useMemo(() => {
    return flatTransactions.map(transaction => ({
      id: transaction.id,
      type:
        transaction.status === "COMPLETE"
          ? MyRewardsTransactionsContextFilterType.PAID
          : MyRewardsTransactionsContextFilterType.REWARDED,
      date: transaction.requestedAt ?? "",
      amount: {
        value: transaction.amount.amount,
        currency: transaction.amount.currency,
        usdEquivalent: transaction.amount.usdEquivalent,
      },
    }));
  }, [flatTransactions]);

  return <TransactionsWrapper isLoading={isLoading} transactions={transactions} />;
}
