import { SearchItem } from "@/core/domain/search/models/search-item-model";
import { SearchStoragePort } from "@/core/domain/search/outputs/search-storage-port";
import { SearchResponse } from "@/core/domain/search/search-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class SearchClientAdapter implements SearchStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    search: "search",
  } as const;

  search = ({ queryParams, pathParams }: FirstParameter<SearchStoragePort["search"]>) => {
    const path = this.routes["search"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });

    const request = async () => {
      const data = await this.client.request<SearchResponse>({
        path,
        method,
        tag,
        queryParams,
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
}
