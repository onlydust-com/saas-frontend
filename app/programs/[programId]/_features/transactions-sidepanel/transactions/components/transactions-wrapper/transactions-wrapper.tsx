import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

import { TransactionsWrapperProps } from "./transactions-wrapper.types";

export function TransactionsWrapper({ programId, queryParams }: TransactionsWrapperProps) {
  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramsTransactions({
    pathParams: { programId },
    queryParams: {
      ...queryParams,
      sort: "CREATED_AT",
      direction: "DESC",
      pageSize: 100,
    },
  });

  const flatTransactions = useMemo(() => data?.pages.flatMap(({ transactions }) => transactions) ?? [], [data]);

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

  // TODO: @NeoxAzrot change status
  return (
    <div className="flex flex-col gap-3">
      {flatTransactions.map(transaction => (
        <CardTransaction
          key={transaction.id}
          status="allocated"
          date={transaction.date}
          amount={{
            value: transaction.amount.amount,
            currency: transaction.amount.currency,
            usdEquivalent: transaction.amount.usdEquivalent,
          }}
          // buttonProps={{}}
        />
      ))}
    </div>
  );
}
