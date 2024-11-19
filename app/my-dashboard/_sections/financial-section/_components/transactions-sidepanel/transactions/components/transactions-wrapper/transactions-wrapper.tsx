import { useMemo } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

import { useTransactionsContext } from "../../../context/transactions.context";

export function TransactionsWrapper({ date }: { date: Date }) {
  const { queryParams } = useTransactionsContext();

  const { data, isLoading } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      ...queryParams,
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

  // TODO: Change it
  return (
    <>
      {flatTransactions.map(transaction => (
        <div key={transaction.id}>
          <CardTransaction
            type={"REWARDED"}
            date="2021-09-01"
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
