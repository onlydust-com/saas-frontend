import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

// TODO: keep ?
export interface Item {
  id: number | string;
  label?: string | JSX.Element;
  value: string;
  image?: string | null;
  iconSlug?: string | null;
}

export interface MoreInfosField {
  url: string;
  value?: string;
  id: string;
}

export interface CreateFormDataRepos {
  repoId: number;
  orgId: number;
}

export type CreateFormData = Omit<components["schemas"]["CreateProjectRequest"], "moreInfos"> & {
  selectedRepos: CreateFormDataRepos[];
  moreInfos: MoreInfosField[];
  search: string;
  ecosystems: Item[];
  projectCategories: Item[];
  categorySuggestions: string[];
};
