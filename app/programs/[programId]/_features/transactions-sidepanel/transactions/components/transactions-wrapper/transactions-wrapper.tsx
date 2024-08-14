import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { TransactionListItem } from "@/core/domain/transaction/models/transaction-list-item-model";

import { Avatar } from "@/design-system/atoms/avatar";
import {
  CardTransaction,
  CardTransactionLoading,
  CardTransactionPort,
} from "@/design-system/molecules/cards/card-transaction";

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

  const mockData: TransactionListItem[] = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      date: "2024-01-14T08:17:55.411Z",
      type: "GRANTED",
      thirdParty: {
        project: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          slug: "my-awesome-project",
          name: "Awesome Project",
          logoUrl: "https://example.com/logo.png",
        },
      },
      amount: {
        amount: 150,
        prettyAmount: 150,
        currency: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          code: "USDC",
          name: "USD Coin",
          logoUrl: "string",
          decimals: 2,
        },
        usdEquivalent: 225,
        usdConversionRate: 1.5,
      },
    },
    {
      id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
      date: "2024-02-14T09:17:55.411Z",
      type: "RECEIVED",
      thirdParty: {
        sponsor: {
          id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Ethereum Foundation",
          logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
        },
      },
      amount: {
        amount: 200,
        prettyAmount: 200,
        currency: {
          id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
          code: "USDC",
          name: "USD Coin",
          logoUrl: "string",
          decimals: 2,
        },
        usdEquivalent: 300,
        usdConversionRate: 1.5,
      },
    },
    {
      id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
      date: "2024-03-14T10:17:55.411Z",
      type: "RETURNED",
      thirdParty: {
        project: {
          id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
          slug: "another-great-project",
          name: "Another Great Project",
          logoUrl: "https://example.com/another-logo.png",
        },
      },
      amount: {
        amount: 100,
        prettyAmount: 100,
        currency: {
          id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
          code: "USDC",
          name: "USD Coin",
          logoUrl: "string",
          decimals: 2,
        },
        usdEquivalent: 150,
        usdConversionRate: 1.5,
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <CardTransactionLoading />
        <CardTransactionLoading />
      </div>
    );
  }

  if (!mockData.length) {
    return null;
  }

  // TODO: Open panel project on click
  function getButtonProps(transaction: TransactionListItem): CardTransactionPort<"div">["buttonProps"] {
    if (transaction.thirdParty.project) {
      return {
        startContent: <Avatar src={transaction.thirdParty.project.logoUrl} size="xs" shape="square" />,
        children: transaction.thirdParty.project.name,
        onClick: () => {
          console.log("Open project");
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
      {mockData.map(transaction => (
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
