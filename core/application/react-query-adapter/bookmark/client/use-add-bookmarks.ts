import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { AddBookmarkBody } from "@/core/domain/bookmark/bookmark-contract.types";
import { BookmarkFacadePort } from "@/core/domain/bookmark/input/bookmark-facade-port";

export function useAddBookmark({
  options,
}: UseMutationFacadeParams<BookmarkFacadePort["addBookmark"], never, AddBookmarkBody> = {}) {
  const bookmarkStoragePort = bootstrap.getBookmarkStoragePortForClient();

  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...bookmarkStoragePort.addBookmark({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: bookmarkStoragePort.getBookmark({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
