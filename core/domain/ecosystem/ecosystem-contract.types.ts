import { EcosystemLink } from "@/core/domain/ecosystem/models/ecosystem-link-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Search ecosystems -------------------------------- */

export type SearchEcosystemsResponse = components["schemas"]["EcosystemPage"];

export type SearchEcosystemsModel = Omit<SearchEcosystemsResponse, "ecosystems"> & {
  ecosystems: EcosystemLink[];
};

type SearchEcosystemsQueryParams = operations["getAllEcosystems"]["parameters"]["query"];
type SearchEcosystemsPathParams = operations["getAllEcosystems"]["parameters"]["path"];

export type SearchEcosystemsPortParams = HttpClientParameters<{
  QueryParams: SearchEcosystemsQueryParams;
  PathParams: SearchEcosystemsPathParams;
}>;

export type SearchEcosystemsPortResponse = HttpStorageResponse<SearchEcosystemsModel>;
