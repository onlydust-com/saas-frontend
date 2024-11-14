import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ---------------------------- Patch Application --------------------------- */

export type PatchApplicationBody = components["schemas"]["ProjectApplicationPatchRequest"];

export type PatchApplicationPathParams = operations["patchProjectApplication"]["parameters"]["path"];

export type PatchApplicationPortParams = HttpClientParameters<{ PathParams: PatchApplicationPathParams }>;

export type PatchApplicationPortResponse = HttpStorageResponse;

/* ---------------------------- Accept Application --------------------------- */

export type AcceptApplicationPathParams = operations["acceptProjectApplication"]["parameters"]["path"];

export type AcceptApplicationPortParams = HttpClientParameters<{ PathParams: AcceptApplicationPathParams }>;

export type AcceptApplicationPortResponse = HttpStorageResponse;

/* ----------------------------- Get application ---------------------------- */

export type GetApplicationByIdPathParams = operations["getProjectApplication"]["parameters"]["path"];

export type GetApplicationByIdPortParams = HttpClientParameters<{ PathParams: GetApplicationByIdPathParams }>;

export type GetApplicationByIdResponse = components["schemas"]["ProjectApplicationResponse"];

export type GetApplicationByIdPortResponse = HttpStorageResponse<GetApplicationByIdResponse>;

/* ----------------------------- Delete application ---------------------------- */

export type DeleteApplicationBody = components["schemas"]["ProjectApplicationDeleteRequest"];

export type DeleteApplicationPathParams = operations["deleteProjectApplication"]["parameters"]["path"];

export type DeleteApplicationPortParams = HttpClientParameters<{ PathParams: DeleteApplicationPathParams }>;

export type DeleteApplicationPortResponse = HttpStorageResponse;
