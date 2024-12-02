import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";
import { ProgramProjectListItemInterface } from "@/core/domain/program/models/program-project-list-item-model";
import { ProgramSponsorListItemInterface } from "@/core/domain/program/models/program-sponsor-list-item";
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
export type GetProgramTransactionsResponse = components["schemas"]["ProgramTransactionPageResponse"];
export type GetProgramTransactionsModel = Omit<GetProgramTransactionsResponse, "transactions"> & {
  transactions: TransactionListItemInterface[];
};

type GetProgramTransactionsQueryParams = operations["getProgramTransactions_1"]["parameters"]["query"];

type GetProgramTransactionsPathParams = operations["getProgramTransactions_1"]["parameters"]["path"];

export type GetProgramTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetProgramTransactionsQueryParams;
  PathParams: GetProgramTransactionsPathParams;
}>;

export type GetProgramTransactionsPortResponse = HttpStorageResponse<GetProgramTransactionsModel>;

/* ---------------------- Get Program Transactions CSV ---------------------- */
export type GetProgramTransactionsCsvPortResponse = HttpStorageResponse<Blob>;

/* ------------------------ Get Program Projects ------------------------ */

export type GetProgramProjectsResponse = components["schemas"]["ProgramProjectsPageResponse"];
export type GetProgramProjectsModel = Omit<GetProgramProjectsResponse, "projects"> & {
  projects: ProgramProjectListItemInterface[];
};

type GetProgramProjectsQueryParams = operations["getProgramProjects"]["parameters"]["query"];

type GetProgramProjectsPathParams = operations["getProgramProjects"]["parameters"]["path"];

export type GetProgramProjectsPortParams = HttpClientParameters<{
  QueryParams: GetProgramProjectsQueryParams;
  PathParams: GetProgramProjectsPathParams;
}>;

export type GetProgramProjectsPortResponse = HttpStorageResponse<GetProgramProjectsResponse>;

/* ------------------------ Grant Budget To Project ------------------------ */

export type GrantBudgetToProjectBody = components["schemas"]["GrantRequest"];

type GrantBudgetToProjectPathParams = operations["grantBudgetToProject"]["parameters"]["path"];

export type GrantBudgetToProjectPortParams = HttpClientParameters<{ PathParams: GrantBudgetToProjectPathParams }>;

export type GrantBudgetToProjectPortResponse = HttpStorageResponse;

/* ------------------------------- Get Program Project ------------------------------ */

export type GetProgramProjectResponse = components["schemas"]["ProgramProjectResponse"];

export type GetProgramProjectPortResponse = HttpStorageResponse<GetProgramProjectResponse>;

type GetProgramProjectPathParams = operations["getProgramProject"]["parameters"]["path"];

export type GetProgramProjectPortParams = HttpClientParameters<{
  PathParams: GetProgramProjectPathParams;
}>;

/* --------------------- Upload program logo --------------------- */

export type UploadProgramLogoResponse = components["schemas"]["UploadImageResponse"];

export type UploadProgramLogoPortParams = HttpClientParameters<object>;

export type UploadProgramLogoPortResponse = HttpStorageResponse<UploadProgramLogoResponse, File>;

/* --------------------- Edit Program --------------------- */

export type EditProgramBody = components["schemas"]["UpdateProgramRequest"];

type EditProgramPathParams = operations["updateProgram"]["parameters"]["path"];

export type EditProgramPortParams = HttpClientParameters<{
  PathParams: EditProgramPathParams;
  QueryParams: { sponsorId?: string };
}>;

export type EditProgramPortResponse = HttpStorageResponse;

/* --------------------- Unallocate Program --------------------- */

export type UnallocateFundsFromProgramBody = components["schemas"]["UnallocateRequest"];

type UnallocateFundsFromProgramPathParams = operations["unallocateFundsFromProgram"]["parameters"]["path"];

export type UnallocateFundsFromProgramPortParams = HttpClientParameters<{
  PathParams: UnallocateFundsFromProgramPathParams;
}>;

export type UnallocateFundsFromProgramPortResponse = HttpStorageResponse;

/* ------------------------ Get Program Sponsors ------------------------ */

export type GetProgramSponsorsResponse = components["schemas"]["ProgramSponsorPageResponse"];

export type GetProgramSponsorsModel = Omit<GetProgramSponsorsResponse, "sponsors"> & {
  sponsors: ProgramSponsorListItemInterface[];
};

type GetProgramSponsorsPathParams = operations["getProgramSponsors"]["parameters"]["path"];
type GetProgramSponsorsQueryParams = operations["getProgramSponsors"]["parameters"]["query"];

export type GetProgramSponsorsPortParams = HttpClientParameters<{
  QueryParams: GetProgramSponsorsQueryParams;
  PathParams: GetProgramSponsorsPathParams;
}>;

export type GetProgramSponsorsPortResponse = HttpStorageResponse<GetProgramSponsorsModel>;
