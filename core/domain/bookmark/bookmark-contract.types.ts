import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ GET BOOKMARK ------------------------------ */
// export type GetBookmarkResponse = components["schemas"]["BookmarkResponse"];
export type GetBookmarkResponse = {
  bookmarks: string[];
};

export type GetBookmarkPortResponse = HttpStorageResponse<GetBookmarkResponse>;

export type GetBookmarkPortParams = HttpClientParameters<object>;

/* ------------------------------ ADD BOOKMARK ------------------------------ */

export type AddBookmarkPortParams = HttpClientParameters<object>;

export type AddBookmarkPortResponse = HttpStorageResponse;

export type AddBookmarkBody = {
  projectId: string;
};

/* ---------------------------- REMOVE BOOKMARKS ---------------------------- */

// type RemoveBookmarkPathParams = operations["removeBookmark"]["parameters"]["path"];
export type RemoveBookmarkBody = {
  projectId: string;
};

export type RemoveBookmarkPortParams = HttpClientParameters<object>;

export type RemoveBookmarkPortResponse = HttpStorageResponse;
