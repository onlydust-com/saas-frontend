import { SearchItem } from "@/core/domain/search/models/search-item-model";
import { Suggest } from "@/core/domain/search/models/suggest-model";
import { SearchStoragePort } from "@/core/domain/search/outputs/search-storage-port";
import { SearchResponse, SuggestResponse } from "@/core/domain/search/search-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class SearchClientAdapter implements SearchStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    search: "search",
    suggest: "suggest",
  } as const;

  search = ({ queryParams, pathParams }: FirstParameter<SearchStoragePort["search"]>) => {
    const path = this.routes["search"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });

    const request = async () => {
      const data = await this.client.request<SearchResponse>({
        path,
        method,
        tag,
        body: JSON.stringify(queryParams),
        pathParams,
      });

      return {
        ...data,
        results: data.results.map(result => new SearchItem(result)),
      };
    };

    return {
      request,
      tag,
    };
  };

  suggest = ({ queryParams, pathParams }: FirstParameter<SearchStoragePort["suggest"]>) => {
    const path = this.routes["suggest"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });

    const request = async () => {
      const data = await this.client.request<SuggestResponse>({
        path,
        method,
        tag,
        body: JSON.stringify(queryParams),
        pathParams,
      });

      return new Suggest(data);
    };

    return {
      request,
      tag,
    };
  };
}
