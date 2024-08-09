import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BannerFacadePort } from "@/core/domain/banner/input/banner-facade-port";
import { BannerInterface } from "@/core/domain/banner/models/banner-model";

export function useGetBanner({ options }: UseQueryFacadeParams<BannerFacadePort["getBanner"], BannerInterface>) {
  const bannerStoragePort = bootstrap.getBannerStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...bannerStoragePort.getBanner({}),
      options,
    })
  );
}
