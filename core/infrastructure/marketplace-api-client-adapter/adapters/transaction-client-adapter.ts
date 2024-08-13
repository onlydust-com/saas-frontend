import { GetTransactionResponse } from "@/core/domain/transaction/transaction-contract.types";
import { Transaction } from "@/core/domain/transaction/models/transaction-model";
import { TransactionStoragePort } from "@/core/domain/transaction/outputs/transaction-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class TransactionClientAdapter implements TransactionStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getTransaction: "transaction",
  } as const;

  getTransaction = () => {
    const path = this.routes["getTransaction"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetTransactionResponse>({
        path,
        method,
        tag,
      });

      return new Transaction(data);
    };

    return {
      request,
      tag,
    };
  };
}
