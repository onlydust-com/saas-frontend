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
