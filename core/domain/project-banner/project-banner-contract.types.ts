import { ProjectBannerInterface } from "@/core/domain/project-banner/models/project-banner-model";
import { components } from "@/core/infrastructure/json-storage-client-adapter/contract/api";

/* --------------------------------- Get Project Banners -------------------------------- */

export type GetProjectBannersResponse = components["schemas"]["ProjectBannerResponse"];

export type GetProjectBannersPortParams = object;

export type GetProjectBannersPortResponse = ProjectBannerInterface[];
