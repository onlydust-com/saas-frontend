import { GetBookmarkResponse } from "@/core/domain/bookmark/bookmark-contract.types";
import { BookmarkProject } from "@/core/domain/bookmark/models/bookmark-project-model";
import { BookmarkStoragePort } from "@/core/domain/bookmark/outputs/bookmark-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class BookmarkClientAdapter implements BookmarkStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBookmark: "me/bookmarks",
    addBookmark: "me/bookmarks/projects/:projectId",
    removeBookmark: "me/bookmarks/projects/:projectId",
  } as const;

  getBookmark = () => {
    const path = this.routes["getBookmark"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetBookmarkResponse>({
        path,
        method,
        tag,
      });

      return {
        ...data,
        projects: data.projects.map(project => new BookmarkProject(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  addBookmark = ({ pathParams }: FirstParameter<BookmarkStoragePort["addBookmark"]>) => {
    const path = this.routes["addBookmark"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  removeBookmark = ({ pathParams }: FirstParameter<BookmarkStoragePort["removeBookmark"]>) => {
    const path = this.routes["removeBookmark"];
    const method = "DELETE";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };
}
