import { TransactionListItem } from "@/core/domain/transaction/models/transaction-list-item-model";
import { TransactionStoragePort } from "@/core/domain/transaction/outputs/transaction-storage-port";
import { GetTransactionsResponse } from "@/core/domain/transaction/transaction-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class TransactionClientAdapter implements TransactionStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getTransactions: "transactions",
  } as const;

  getTransactions = ({ queryParams }: FirstParameter<TransactionStoragePort["getTransactions"]>) => {
    const path = this.routes["getTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetTransactionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        transactions: data.transactions.map(transaction => new TransactionListItem(transaction)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
