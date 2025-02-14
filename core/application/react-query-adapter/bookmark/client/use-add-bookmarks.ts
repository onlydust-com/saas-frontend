import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BookmarkFacadePort } from "@/core/domain/bookmark/input/bookmark-facade-port";

export function useAddBookmark({
  options,
  pathParams,
}: UseMutationFacadeParams<BookmarkFacadePort["addBookmark"], never, never> = {}) {
  const bookmarkStoragePort = bootstrap.getBookmarkStoragePortForClient();

  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...bookmarkStoragePort.addBookmark({ pathParams }),
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
