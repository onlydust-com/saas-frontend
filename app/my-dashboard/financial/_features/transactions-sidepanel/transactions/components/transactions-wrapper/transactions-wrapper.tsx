import { useMemo } from "react";

import { useTransactionsContext } from "@/app/my-dashboard/financial/_features/transactions-sidepanel/context/transactions.context";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";

import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

export function TransactionsWrapper({ date }: { date: Date }) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { githubUserId, queryParams } = useTransactionsContext();

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
      pageSize: 100,
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  const flatTransactions = useMemo(() => data?.pages.flatMap(({ rewards }) => rewards) ?? [], [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <CardTransactionLoading />
        <CardTransactionLoading />
      </div>
    );
  }

  if (!flatTransactions.length) {
    return null;
  }

  return (
    <>
      {flatTransactions.map(transaction => (
        <div key={transaction.id}>
          <CardTransaction
            type={transaction.status === "COMPLETE" ? "PAID" : "REWARDED"}
            date={transaction.requestedAt || ""}
            amount={{
              value: transaction.amount.amount,
              currency: transaction.amount.currency,
              usdEquivalent: transaction.amount.usdEquivalent,
            }}
            size={"none"}
            background={"transparent"}
            border={"none"}
          />
        </div>
      ))}
    </>
  );
}
