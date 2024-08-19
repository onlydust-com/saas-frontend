import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { TransactionListItemInterface } from "../transaction/models/transaction-list-item-model";

/* ------------------------------ Get Programs ------------------------------ */
export type GetProgramsResponse = components["schemas"]["ProgramPageResponse"];
export type GetProgramsModel = Omit<GetProgramsResponse, "programs"> & {
  programs: ProgramListItemInterface[];
};

type GetProgramsQueryParams = operations["getMyPrograms"]["parameters"]["query"];

export type GetProgramsPortResponse = HttpStorageResponse<GetProgramsModel>;

export type GetProgramsPortParams = HttpClientParameters<{
  QueryParams: GetProgramsQueryParams;
}>;

/* ------------------------------- Get Program ------------------------------ */
export type GetProgramResponse = components["schemas"]["ProgramResponse"];

export type GetProgramByIdPortResponse = HttpStorageResponse<GetProgramResponse>;

type GetProgramByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetProgramByIdPortParams = HttpClientParameters<{
  PathParams: GetProgramByIdPathParams;
}>;

/* ------------------------ Get Program Transactions ------------------------ */
export type GetProgramTransactionsResponse = components["schemas"]["TransactionPageResponse"];
export type GetProgramTransactionsModel = Omit<GetProgramTransactionsResponse, "transactions"> & {
  transactions: TransactionListItemInterface[];
};

type GetProgramTransactionsQueryParams = operations["getProgramTransactions"]["parameters"]["query"];

type GetProgramTransactionsPathParams = operations["getProgramTransactions"]["parameters"]["path"];

export type GetProgramTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetProgramTransactionsQueryParams;
  PathParams: GetProgramTransactionsPathParams;
}>;

export type GetProgramTransactionsPortResponse = HttpStorageResponse<GetProgramTransactionsModel>;

/* --------------------- Get Program Transactions Stats --------------------- */
export type GetProgramTransactionsStatsResponse = components["schemas"]["ProgramTransactionStatListResponse"];

type GetProgramTransactionsStatsQueryParams = operations["getProgramTransactionsStats"]["parameters"]["query"];

type GetProgramTransactionsStatsPathParams = operations["getProgramTransactionsStats"]["parameters"]["path"];

export type GetProgramTransactionsStatsPortParams = HttpClientParameters<{
  QueryParams: GetProgramTransactionsStatsQueryParams;
  PathParams: GetProgramTransactionsStatsPathParams;
}>;

export type GetProgramTransactionsStatsPortResponse = HttpStorageResponse<GetProgramTransactionsStatsResponse>;

/* ------------------------ Get Program Projects ------------------------ */

export type GetProgramProjectsResponse = components["schemas"]["ProgramProjectsPageResponse"];
export type GetProgramProjectsModel = Omit<GetProgramProjectsResponse, "projects"> & {
  projects: ProgramListItemInterface[];
};

type GetProgramProjectsQueryParams = operations["getProgramProjects"]["parameters"]["query"];

type GetProgramProjectsPathParams = operations["getProgramProjects"]["parameters"]["path"];

export type GetProgramProjectsPortParams = HttpClientParameters<{
  QueryParams: GetProgramProjectsQueryParams;
  PathParams: GetProgramProjectsPathParams;
}>;

export type GetProgramProjectsPortResponse = HttpStorageResponse<GetProgramProjectsResponse>;
