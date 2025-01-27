import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { TransactionsWrapper as CommonTransactionsWrapper } from "@/shared/features/transactions/transactions-wrapper/transactions-wrapper";

import { useTransactionsContext } from "../../context/transactions.context";
import { TransactionsWrapperProps } from "./transactions-wrapper.types";

export function TransactionsWrapper({ date }: TransactionsWrapperProps) {
  const { programId, queryParams } = useTransactionsContext();

  const dateKernelPort = bootstrap.getDateKernelPort();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getMonthRange(date);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [date, dateKernelPort]);

  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramTransactions({
    pathParams: { programId },
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

  return <CommonTransactionsWrapper isLoading={isLoading} transactions={transactions} />;
}
