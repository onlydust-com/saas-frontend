import { SearchResponse } from "../search-contract.types";

export type SearchFacet = NonNullable<
  | NonNullable<NonNullable<SearchResponse["projectFacets"]>["ecosystems"]>[0]
  | NonNullable<NonNullable<SearchResponse["projectFacets"]>["categories"]>[0]
  | NonNullable<NonNullable<SearchResponse["projectFacets"]>["languages"]>[0]
  | NonNullable<NonNullable<SearchResponse["typeFacets"]>["types"]>[0]
>;

export enum SearchRessourceType {
  PROJECT = "PROJECT",
  CONTRIBUTOR = "CONTRIBUTOR",
}

export const SearchRessourceTypeMapping: { [key: string]: SearchRessourceType } = {
  Projects: SearchRessourceType.PROJECT,
  Contributors: SearchRessourceType.CONTRIBUTOR,
};

export const SearchRessourceTypeMappingInverse: { [key in SearchRessourceType]: string } = {
  [SearchRessourceType.PROJECT]: "Projects",
  [SearchRessourceType.CONTRIBUTOR]: "Contributors",
};
