import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type EcosystemsListItemResponse = components["schemas"]["EcosystemPageItemResponse"];

export interface EcosystemsListItemInterface extends EcosystemsListItemResponse {}

export class EcosystemsListItem implements EcosystemsListItemInterface {
  id!: EcosystemsListItemResponse["id"];
  slug!: EcosystemsListItemResponse["slug"];
  name!: EcosystemsListItemResponse["name"];
  description!: EcosystemsListItemResponse["description"];
  banners!: EcosystemsListItemResponse["banners"];
  topProjects!: EcosystemsListItemResponse["topProjects"];
  projectCount!: EcosystemsListItemResponse["projectCount"];
  topProjectCategories!: EcosystemsListItemResponse["topProjectCategories"];
  projectCategoryCount!: EcosystemsListItemResponse["projectCategoryCount"];

  constructor(props: EcosystemsListItemResponse) {
    Object.assign(this, props);
  }
}
