import { AddBookmarkBody, RemoveBookmarkBody } from "@/core/domain/bookmark/bookmark-contract.types";
import { BookmarkStoragePort } from "@/core/domain/bookmark/outputs/bookmark-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class BookmarkClientAdapter implements BookmarkStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBookmark: "bookmark",
    addBookmark: "bookmark",
    removeBookmark: "bookmark/:projectId",
  } as const;

  getBookmark = () => {
    const path = this.routes["getBookmark"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      // const data = await this.client.request<GetBookmarkResponse>({
      //   path,
      //   method,
      //   tag,
      // });

      const _localData = localStorage.getItem("bookmark");
      if (_localData) {
        return {
          bookmarks: JSON.parse(_localData),
        };
      }

      return {
        bookmarks: [],
      };
    };

    return {
      request,
      tag,
    };
  };

  addBookmark = () => {
    const path = this.routes["addBookmark"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });
    const request = async (body: AddBookmarkBody) => {
      // const data = await this.client.request<GetBookmarkResponse>({
      //   path,
      //   method,
      //   tag,
      // });

      const _localData = localStorage.getItem("bookmark");
      const newBookmark = [...(_localData ? JSON.parse(_localData) : []), body.projectId];

      localStorage.setItem("bookmark", JSON.stringify(newBookmark));

      return null as never;
    };

    return {
      request,
      tag,
    };
  };

  removeBookmark = ({ pathParams }: FirstParameter<BookmarkStoragePort["removeBookmark"]>) => {
    const path = this.routes["removeBookmark"];
    const method = "DELETE";
    const tag = HttpClient.buildTag({ path });
    const request = async (body: RemoveBookmarkBody) => {
      // const data = await this.client.request<GetBookmarkResponse>({
      //   path,
      //   method,
      //   tag,
      // });

      if (body?.projectId) {
        const _localData = localStorage.getItem("bookmark");
        const newBookmark = [
          ...(_localData ? JSON.parse(_localData) : [])?.filter((id: string) => id !== body.projectId),
        ];

        localStorage.setItem("bookmark", JSON.stringify(newBookmark));
      }

      return null as never;
    };

    return {
      request,
      tag,
    };
  };
}
