import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { TransactionListItemInterface } from "./models/transaction-list-item-model";

/* ---------------------------- Get Transactions ---------------------------- */
export type GetTransactionsResponse = components["schemas"]["TransactionPageResponse"];
export type GetTransactionsModel = Omit<GetTransactionsResponse, "transactions"> & {
  transactions: TransactionListItemInterface[];
};

type GetTransactionsQueryParams = operations["getProgramTransactions"]["parameters"]["query"];

export type GetTransactionsPortResponse = HttpStorageResponse<GetTransactionsModel>;

export type GetTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetTransactionsQueryParams;
}>;
