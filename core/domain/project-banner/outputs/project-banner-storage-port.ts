import {
  GetProjectBannersPortParams,
  GetProjectBannersPortResponse,
} from "@/core/domain/project-banner/project-banner-contract.types";

export interface ProjectBannerStoragePort {
  routes: Record<string, string>;
  getProjectBanners(p: GetProjectBannersPortParams): GetProjectBannersPortResponse;
}
