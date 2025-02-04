import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { UploadProfilePictureResponse } from "@/core/domain/me/me-contract.types";

export function useUploadProfilePicture({
  options,
}: UseMutationFacadeParams<MeFacadePort["uploadProfilePicture"], undefined, UploadProfilePictureResponse, File> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.uploadProfilePicture({}),
      ...options,
    })
  );
}
