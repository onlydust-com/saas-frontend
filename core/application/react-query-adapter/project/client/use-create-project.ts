import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";
import { CreateProjectBody, CreateProjectResponse } from "@/core/domain/project/project-contract.types";

export function useCreateProject({
  pathParams,
  options,
}: UseMutationFacadeParams<ProjectFacadePort["createProject"], undefined, CreateProjectResponse, CreateProjectBody> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.createProject({ pathParams }),
      options,
    })
  );
}
