import { components } from "@/core/infrastructure/json-storage-client-adapter/contract/api";

export type ProjectBannerResponse = components["schemas"]["ProjectBannerResponse"];

export interface ProjectBannerInterface extends ProjectBannerResponse {}

export class ProjectBanner implements ProjectBannerInterface {
  title!: ProjectBannerResponse["title"];
  subtitle!: ProjectBannerResponse["subtitle"];
  theme!: ProjectBannerResponse["theme"];
  image!: ProjectBannerResponse["image"];
  backgroundColor!: ProjectBannerResponse["backgroundColor"];
  ctas!: ProjectBannerResponse["ctas"];

  constructor(props: ProjectBannerResponse) {
    Object.assign(this, props);
  }
}
