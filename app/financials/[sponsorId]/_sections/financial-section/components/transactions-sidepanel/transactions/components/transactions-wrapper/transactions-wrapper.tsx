import { Check, LoaderCircle, X } from "lucide-react";
import { useMemo } from "react";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";
import { SponsorTransactionListItemResponse } from "@/core/domain/sponsor/models/sponsor-transaction-list-item-model";

import { Avatar } from "@/design-system/atoms/avatar";
import { Icon } from "@/design-system/atoms/icon";
import {
  CardTransaction,
  CardTransactionLoading,
  CardTransactionPort,
} from "@/design-system/molecules/cards/card-transaction";

import { useTransactionsContext } from "../../../context/transactions.context";

export function TransactionsWrapper({ date }: { date: Date }) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { sponsorId, queryParams } = useTransactionsContext();

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getMonthRange(date);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [date, dateKernelPort]);

  const { data, isLoading } = SponsorReactQueryAdapter.client.useGetSponsorTransactions({
    pathParams: { sponsorId },
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

  const transactionIconMapping = {
    PENDING: <Icon component={LoaderCircle} classNames={{ base: "text-text-2" }} />,
    REJECTED: <Icon component={X} classNames={{ base: "text-text-2" }} />,
    COMPLETED: <Icon component={Check} classNames={{ base: "text-text-2" }} />,
  };

  function getBadgeProps(transaction: SponsorTransactionListItemResponse): CardTransactionPort<"div">["badgeProps"] {
    if (transaction.depositStatus) {
      return {
        startContent: transactionIconMapping[transaction.depositStatus],
        children: transaction.depositStatus,
      };
    }

    if (transaction.program) {
      return {
        startContent: <Avatar src={transaction.program.logoUrl} size="xs" shape="squared" />,
        children: transaction.program.name,
      };
    }

    return undefined;
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
            badgeProps={getBadgeProps(transaction)}
            size={"none"}
            background={"transparent"}
            border={"none"}
          />
        </div>
      ))}
    </>
  );
}
