import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { TransactionsWrapper } from "@/shared/features/transactions/transactions-wrapper/transactions-wrapper";
import { AccordionTransactionsProps } from "@/shared/panels/project-transactions-sidepanel/_components/accordion-transactions/accordion-transactions.types";
import { useProjectTransactionsContext } from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.context";

export function AccordionTransactions({ date }: AccordionTransactionsProps) {
  const { projectSlug, queryParams } = useProjectTransactionsContext();

  const dateKernelPort = bootstrap.getDateKernelPort();

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
      pageSize: 10000,
    },
  });

  const flatTransactions = useMemo(() => data?.pages.flatMap(({ transactions }) => transactions) ?? [], [data]);

  const transactions = useMemo(() => {
    return flatTransactions.map(transaction => ({
      id: transaction.id,
      type: transaction.type,
      date: transaction.date,
      amount: {
        value: transaction.amount.amount,
        currency: transaction.amount.currency,
        usdEquivalent: transaction.amount.usdEquivalent,
      },
    }));
  }, [flatTransactions]);

  return <TransactionsWrapper isLoading={isLoading} transactions={transactions} />;
}
