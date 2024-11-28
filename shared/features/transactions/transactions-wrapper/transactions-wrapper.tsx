import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

import { TransactionsWrapperProps } from "./transactions-wrapper.types";

export function TransactionsWrapper({ isLoading, transactions }: TransactionsWrapperProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-lg">
        <CardTransactionLoading />
        <CardTransactionLoading />
      </div>
    );
  }

  if (!transactions.length) {
    return null;
  }

  return transactions.map(transaction => (
    <div key={transaction.id}>
      <CardTransaction
        type={transaction.type}
        date={transaction.date}
        amount={transaction.amount}
        size="none"
        background="transparent"
        border="none"
      />
    </div>
  ));
}
