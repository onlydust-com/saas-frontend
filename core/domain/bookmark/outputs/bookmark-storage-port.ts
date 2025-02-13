import {
  AddBookmarkPortParams,
  AddBookmarkPortResponse,
  GetBookmarkPortParams,
  GetBookmarkPortResponse,
  RemoveBookmarkPortParams,
  RemoveBookmarkPortResponse,
} from "@/core/domain/bookmark/bookmark-contract.types";

export interface BookmarkStoragePort {
  routes: Record<string, string>;
  getBookmark(p: GetBookmarkPortParams): GetBookmarkPortResponse;
  addBookmark(p: AddBookmarkPortParams): AddBookmarkPortResponse;
  removeBookmark(p: RemoveBookmarkPortParams): RemoveBookmarkPortResponse;
}
