import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SearchItemResponse = components["schemas"]["SearchItemResponse"];

export interface SearchItemInterface extends SearchItemResponse {
  isProject(): boolean;
  isContributor(): boolean;
}

export class SearchItem implements SearchItemInterface {
  type!: SearchItemResponse["type"];
  project!: SearchItemResponse["project"];
  contributor!: SearchItemResponse["contributor"];

  constructor(props: SearchItemResponse) {
    Object.assign(this, props);
  }

  isProject(): boolean {
    return this.type === "PROJECT" && !!this.project;
  }

  isContributor(): boolean {
    return this.type === "CONTRIBUTOR" && !!this.contributor;
  }
}
