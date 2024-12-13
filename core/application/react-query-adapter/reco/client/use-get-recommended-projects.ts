import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { RecoFacadePort } from "@/core/domain/reco/input/reco-facade-port";
import { GetRecommendedProjectsModel } from "@/core/domain/reco/reco-contract.types";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetRecommendedProjects({
  options,
  queryParams,
}: UseQueryFacadeParams<RecoFacadePort["getRecommendedProjects"], GetRecommendedProjectsModel>) {
  const recoStoragePort = bootstrap.getRecoStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...recoStoragePort.getRecommendedProjects({ queryParams }),
      options,
    })
  );
}
