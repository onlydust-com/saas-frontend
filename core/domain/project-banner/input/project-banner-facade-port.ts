import {
  GetProjectBannersPortParams,
  GetProjectBannersPortResponse,
} from "@/core/domain/project-banner/project-banner-contract.types";

export interface ProjectBannerFacadePort {
  getProjectBanners(p: GetProjectBannersPortParams): GetProjectBannersPortResponse;
}
