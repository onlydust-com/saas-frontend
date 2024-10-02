import { useMemo } from "react";

import { useTransactionsContext } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { CardTransaction, CardTransactionLoading } from "@/design-system/molecules/cards/card-transaction";

export function TransactionsWrapper({ date }: { date: Date }) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { projectSlug, queryParams } = useTransactionsContext();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getMonthRange(date);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [date, dateKernelPort]);

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectTransactions({
    pathParams: { projectIdOrSlug: projectSlug },
    queryParams: {
      ...queryParams,
      fromDate,
      toDate,
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
            size={"none"}
            background={"transparent"}
            border={"none"}
          />
        </div>
      ))}
    </>
  );
}
