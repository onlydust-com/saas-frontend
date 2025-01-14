import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategoryInterface } from "../../project-category/models/project-category-model";
import { ProjectListItemV2 } from "../../project/models/project-list-item-model-v2";

export type EcosystemProjectListItemResponse = components["schemas"]["ProjectShortResponseV2"];

export interface EcosystemProjectListItemInterface extends EcosystemProjectListItemResponse {
  categories: ProjectCategoryInterface[];
}

export class EcosystemProjectListItemV2 extends ProjectListItemV2 implements EcosystemProjectListItemInterface {
  constructor(props: EcosystemProjectListItemResponse) {
    super(props);
  }
}
