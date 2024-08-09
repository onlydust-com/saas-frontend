import { GetBannerPortParams, GetBannerPortResponse } from "@/core/domain/banner/banner-contract.types";

export interface BannerStoragePort {
  routes: Record<string, string>;
  getBanner(p: GetBannerPortParams): GetBannerPortResponse;
}
