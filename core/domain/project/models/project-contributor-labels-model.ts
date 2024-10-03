import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProjectContributorLabelsResponse = components["schemas"]["ProjectContributorLabelResponse"];

export interface ProjectContributorLabelsInterface extends ProjectContributorLabelsResponse {}

export class ProjectContributorLabels implements ProjectContributorLabelsInterface {
  id!: ProjectContributorLabelsResponse["id"];
  name!: ProjectContributorLabelsResponse["name"];
  slug!: ProjectContributorLabelsResponse["slug"];

  constructor(props: ProjectContributorLabelsResponse) {
    Object.assign(this, props);
  }
}
