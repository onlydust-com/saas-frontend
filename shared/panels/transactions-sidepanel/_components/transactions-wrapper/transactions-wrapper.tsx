import { useEffect, useMemo } from "react";

import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

import { TransactionsWrapperProps } from "./transactions-wrapper.types";

// TODO: Faire le type de data en brute ici
export function TransactionsWrapper({ data, onOpen }: TransactionsWrapperProps) {
  const flatTransactions = useMemo(() => data?.pages.flatMap(({ transactions }) => transactions) ?? [], [data]);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  // TODO: Check for loading
  if (false) {
    return (
      <div className="flex flex-col gap-lg">
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
            type={transaction.type}
            date={transaction.date}
            amount={{
              value: transaction.amount.amount,
              currency: transaction.amount.currency,
              usdEquivalent: transaction.amount.usdEquivalent,
            }}
            size="none"
            background="transparent"
            border="none"
          />
        </div>
      ))}
    </>
  );
}
