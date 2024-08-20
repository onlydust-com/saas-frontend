import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { TransactionListItem } from "@/core/domain/transaction/models/transaction-list-item-model";

import { Avatar } from "@/design-system/atoms/avatar";
import {
  CardTransaction,
  CardTransactionLoading,
  CardTransactionPort,
} from "@/design-system/molecules/cards/card-transaction";

import { useProjectSidePanel } from "@/shared/features/panels/project-sidepanel/project-sidepanel.context";

import { useTransactionsContext } from "../../context/transactions.context";

export function TransactionsWrapper() {
  const { programId, queryParams } = useTransactionsContext();
  const projectSidePanel = useProjectSidePanel();

  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramTransactions({
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

  // TODO: Open panel project on click
  function getButtonProps(transaction: TransactionListItem): CardTransactionPort<"div">["buttonProps"] {
    if (transaction.thirdParty.project) {
      return {
        startContent: <Avatar src={transaction.thirdParty.project.logoUrl} size="xs" shape="square" />,
        children: transaction.thirdParty.project.name,
        onClick: () => {
          if (transaction.thirdParty.project?.id) {
            projectSidePanel.open(transaction.thirdParty.project.id);
          }
        },
      };
    }

    if (transaction.thirdParty.sponsor) {
      return {
        startContent: <Avatar src={transaction.thirdParty.sponsor.logoUrl} size="xs" shape="square" />,
        children: transaction.thirdParty.sponsor.name,
        canInteract: false,
      };
    }

    return undefined;
  }

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
          buttonProps={getButtonProps(transaction)}
        />
      ))}
    </div>
  );
}
