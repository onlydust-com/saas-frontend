import { GetBannerPortParams, GetBannerPortResponse } from "@/core/domain/banner/banner-contract.types";

export interface BannerFacadePort {
  getBanner(p: GetBannerPortParams): GetBannerPortResponse;
}
