import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Avatar } from "@/design-system/atoms/avatar";
import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

import { TransactionsWrapperProps } from "./transactions-wrapper.types";

export function TransactionsWrapper({ programId, queryParams }: TransactionsWrapperProps) {
  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramsTransactions({
    pathParams: { programId },
    queryParams: {
      ...queryParams,
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

  // TODO: Add the link when we have the router
  return (
    <div className="flex flex-col gap-3">
      {flatTransactions.map(transaction => (
        <CardTransaction
          key={transaction.id}
          type={transaction.type}
          date={transaction.date}
          amount={{
            value: transaction.amount.amount,
            currency: transaction.amount.currency,
            usdEquivalent: transaction.amount.usdEquivalent,
          }}
          buttonProps={{
            startContent: <Avatar src={transaction.thirdParty.logoUrl} size="xs" shape="square" />,
            children: transaction.thirdParty.name,
            // htmlProps: { href: transaction.thirdParty.slug },
          }}
        />
      ))}
    </div>
  );
}
