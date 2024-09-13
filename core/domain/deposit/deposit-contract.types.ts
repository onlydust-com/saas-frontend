import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------ Preview Deposit ------------------------ */

export type PreviewDepositBody = components["schemas"]["PreviewDepositRequest"];
export type PreviewDepositResponse = components["schemas"]["PreviewDepositResponse"];

type PreviewDepositPathParams = operations["previewDeposit"]["parameters"]["path"];

export type PreviewDepositPortParams = HttpClientParameters<{ PathParams: PreviewDepositPathParams }>;

export type PreviewDepositPortResponse = HttpStorageResponse<PreviewDepositResponse>;

/* ------------------------ Update Deposit ------------------------ */

export type UpdateDepositBody = components["schemas"]["UpdateDepositRequest"];

type UpdateDepositPathParams = operations["updateDeposit"]["parameters"]["path"];

export type UpdateDepositPortParams = HttpClientParameters<{ PathParams: UpdateDepositPathParams }>;

export type UpdateDepositPortResponse = HttpStorageResponse;
