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
