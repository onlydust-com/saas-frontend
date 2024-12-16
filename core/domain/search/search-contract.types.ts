import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { SearchItemInterface } from "./models/search-item-model";
import { SuggestInterface } from "./models/suggest-model";

/* --------------------------------- Search -------------------------------- */

export type SearchResponse = components["schemas"]["SearchResponse"];

type SearchQueryParams = components["schemas"]["SearchPostRequest"];
type SearchPathParams = operations["search"]["parameters"]["path"];

export type SearchPortParams = HttpClientParameters<{
  QueryParams: SearchQueryParams;
  PathParams: SearchPathParams;
}>;

export type SearchModel = Omit<SearchResponse, "results"> & {
  results: SearchItemInterface[];
};

export type SearchPortResponse = HttpStorageResponse<SearchModel>;

/* --------------------------------- Suggest -------------------------------- */

export type SuggestResponse = components["schemas"]["SuggestResponse"];

type SuggestQueryParams = components["schemas"]["SuggestPostRequest"];
type SuggestPathParams = operations["suggest"]["parameters"]["path"];

export type SuggestPortParams = HttpClientParameters<{
  QueryParams: SuggestQueryParams;
  PathParams: SuggestPathParams;
}>;

export type SuggestModel = SuggestInterface;

export type SuggestPortResponse = HttpStorageResponse<SuggestModel>;
