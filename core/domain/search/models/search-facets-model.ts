import { SearchFacetInterface } from "./search-facet-model";

export type SearchFacetResponse = {
  facets: SearchFacetInterface[];
};

export interface SearchFacetsInterface extends SearchFacetResponse {
  getLanguagesfacets(): SearchFacetInterface[];
  getCategoriesfacets(): SearchFacetInterface[];
  getEcosystemsfacets(): SearchFacetInterface[];
  facets: SearchFacetInterface[];
}

export class SearchFacets implements SearchFacetsInterface {
  facets!: SearchFacetResponse["facets"];

  constructor(props: SearchFacetResponse) {
    Object.assign(this, props);
  }

  getLanguagesfacets() {
    return this.facets.filter(facet => facet.type === "LANGUAGE");
  }

  getCategoriesfacets() {
    return this.facets.filter(facet => facet.type === "CATEGORY");
  }

  getEcosystemsfacets() {
    return this.facets.filter(facet => facet.type === "ECOSYSTEM");
  }
}
