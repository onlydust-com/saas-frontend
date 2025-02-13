import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

interface FetchHttpClientInterface extends HttpClient {}

export class FetchHttpClient extends HttpClient implements FetchHttpClientInterface {
  constructor() {
    super();
  }

  async request<R>({
    path,
    method,
    tag: tags,
    pathParams,
    queryParams,
    version,
    body,
    next: nextParams = {},
    headers,
    mock = false,
  }: FirstParameter<FetchHttpClientInterface["request"]>): Promise<R> {
    const url = this.buildUrl({ path, pathParams, queryParams, version, mock });
    const defaultHeaders = await this.getHeaders();
    const next = { ...nextParams, tags };
    const cache = !nextParams?.revalidate ? "no-cache" : undefined;

    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
        "ngrok-skip-browser-warning": "69420",
      },
      body,
      next,
      cache,
    });

    return this.formatResponse<R>(response);
  }
}
