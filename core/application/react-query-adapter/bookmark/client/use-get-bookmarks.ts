import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBookmarkResponse } from "@/core/domain/bookmark/bookmark-contract.types";
import { BookmarkFacadePort } from "@/core/domain/bookmark/input/bookmark-facade-port";

export function useGetBookmarks({
  options,
  pathParams,
}: UseQueryFacadeParams<BookmarkFacadePort["getBookmark"], GetBookmarkResponse>) {
  const bookmarkStoragePort = bootstrap.getBookmarkStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...bookmarkStoragePort.getBookmark({ pathParams }),
      options,
    })
  );
}
