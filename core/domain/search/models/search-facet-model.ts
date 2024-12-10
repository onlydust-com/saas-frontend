import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SearchFacetResponse = components["schemas"]["SearchFacetResponse"];

export interface SearchFacetInterface extends SearchFacetResponse {}

export class SearchFacet implements SearchFacetInterface {
  name!: SearchFacetResponse["name"];
  count!: SearchFacetResponse["count"];
  type!: SearchFacetResponse["type"];

  constructor(props: SearchFacetResponse) {
    Object.assign(this, props);
  }
}
