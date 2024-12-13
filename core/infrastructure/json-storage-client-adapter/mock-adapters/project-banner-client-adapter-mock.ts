import { ProjectBanner } from "@/core/domain/project-banner/models/project-banner-model";
import { ProjectBannerStoragePort } from "@/core/domain/project-banner/outputs/project-banner-storage-port";
import { GetProjectBannersPortResponse } from "@/core/domain/project-banner/project-banner-contract.types";

export class ProjectBannerClientAdapterMock implements ProjectBannerStoragePort {
  constructor() {}

  routes = {};

  getProjectBanners(): GetProjectBannersPortResponse {
    return [
      new ProjectBanner({
        title: "Mock Project Banner",
        subtitle: "Mock Subtitle",
        theme: "light",
        image: "mock-image.jpg",
        backgroundColor: "#FFFFFF",
        ctas: [],
      }),
    ];
  }
}
