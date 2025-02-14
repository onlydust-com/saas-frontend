import { BookmarkStoragePort } from "@/core/domain/bookmark/outputs/bookmark-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class BookmarkClientAdapterMock implements BookmarkStoragePort {
  constructor() {}

  routes = {};

  getBookmark = mockHttpStorageResponse<BookmarkStoragePort["getBookmark"]>;
  addBookmark = mockHttpStorageResponse<BookmarkStoragePort["addBookmark"]>;
  removeBookmark = mockHttpStorageResponse<BookmarkStoragePort["removeBookmark"]>;
}
