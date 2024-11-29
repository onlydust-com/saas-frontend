import { IndiceFactory } from "@/core/domain/search/models/indice-model-factory";
import { IndiceInterface } from "@/core/domain/search/models/indice.types";
import { SearchStoragePort } from "@/core/domain/search/outputs/search-storage-port";
import { SearchIndice, SearchRequestReponse } from "@/core/domain/search/search-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { AnyType, FirstParameter } from "@/core/kernel/types";

export class SearchClientAdapter implements SearchStoragePort {
  constructor() {}

  routes = {
    getNotifications: "me/notifications",
    getNotificationsCount: "me/notifications/count",
    updateNotifications: "me/notifications",
    readAllNotifications: "me/notifications/all",
  } as const;

  search = ({ queryParams }: FirstParameter<SearchStoragePort["search"]>) => {
    const path = this.routes["getNotifications"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const baseUrl = (url: string) => `${process.env.NEXT_PUBLIC_ELASTICSEARCH_API_URL}/${url}`;

      const data = await fetch(baseUrl("_all/_search"), {
        method,
        body: JSON.stringify({
          query: {
            simple_query_string: {
              query: queryParams?.search,
            },
          },
        }),
        headers: {
          Authorization: `ApiKey ${process.env.NEXT_PUBLIC_ELASTICSEARCH_API_KEY}`,
          "Content-Type": "application/json",
        },
      }).then(res => res.json() as AnyType as SearchRequestReponse);

      const autoComplete = await fetch(baseUrl("_all/_search"), {
        method,
        body: JSON.stringify({
          query: {
            prefix: {
              name: {
                value: queryParams?.search,
              },
            },
          },
          indices_boost: [
            {
              projects: 100,
            },
            {
              languages: 50,
            },
          ],
        }),
        headers: {
          Authorization: `ApiKey ${process.env.NEXT_PUBLIC_ELASTICSEARCH_API_KEY}`,
          "Content-Type": "application/json",
        },
      }).then(res => res.json() as AnyType as SearchRequestReponse);

      const groupByIndex = data.hits.hits.reduce(
        (acc, hit) => {
          const index = hit._index;
          if (!acc[index]) {
            acc[index] = [];
          }
          acc[index].push(
            IndiceFactory.createIndice({
              _index: hit._index,
              _id: hit._id,
              _score: hit._score,
              _source: hit._source,
            })
          );
          return acc;
        },
        {} as Record<SearchIndice, Array<IndiceInterface | undefined>>
      );

      return {
        results: data.hits.hits.map(hit =>
          IndiceFactory.createIndice({
            _index: hit._index,
            _id: hit._id,
            _score: hit._score,
            _source: hit._source,
          })
        ),
        groups: groupByIndex,
        autoComplete: autoComplete.hits.hits[0]
          ? IndiceFactory.createIndice({
              _index: autoComplete.hits.hits[0]._index,
              _id: autoComplete.hits.hits[0]._id,
              _score: autoComplete.hits.hits[0]._score,
              _source: autoComplete.hits.hits[0]._source,
            })
          : undefined,
      };
    };

    return {
      request,
      tag,
    };
  };
}
