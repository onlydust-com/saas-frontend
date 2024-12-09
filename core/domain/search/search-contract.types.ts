import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { SearchItemInterface } from "./models/search-item-model";

/* --------------------------------- Search -------------------------------- */

export type SearchResponse = components["schemas"]["SearchResponse"];

type SearchQueryParams = operations["search"]["parameters"]["query"];
type SearchPathParams = operations["search"]["parameters"]["path"];

export type SearchPortParams = HttpClientParameters<{
  QueryParams: SearchQueryParams;
  PathParams: SearchPathParams;
}>;

export type SearchModel = Omit<SearchResponse, "results"> & {
  results: SearchItemInterface[];
};

export type SearchPortResponse = HttpStorageResponse<SearchModel>;
