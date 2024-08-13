import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetTransactionResponse = components["schemas"]["TransactionResponse"];

export type GetTransactionPortResponse = HttpStorageResponse<GetTransactionResponse>;

export type GetTransactionPortParams = HttpClientParameters<object>;

/* ---------------------------- Get Transactions ---------------------------- */
export type GetTransactionsResponse = components["schemas"]["TransactionPageResponse"];
export type GetTransactionsModel = Omit<GetTransactionsResponse, "programs"> & {
  programs: ProgramListItemInterface[];
};

type GetTransactionsQueryParams = operations["getMyPrograms"]["parameters"]["query"];

export type GetTransactionsPortResponse = HttpStorageResponse<GetTransactionsModel>;

export type GetTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetTransactionsQueryParams;
}>;
