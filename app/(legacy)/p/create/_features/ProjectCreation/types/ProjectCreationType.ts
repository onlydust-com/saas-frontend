import { TSelectAutocomplete } from "@/legacy/components/ds/form/select-autocomplete/select-autocomplete.types";
import { MoreInfosField } from "@/legacy/src/types";

import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { SelectedLeadType } from "../views/ProjectInformations/components/ProjectLead/ProjectLead";

export interface CreateFormDataRepos {
  repoId: number;
  orgId: number;
}

export type CreateFormData = Omit<components["schemas"]["CreateProjectRequest"], "moreInfos"> & {
  selectedRepos: CreateFormDataRepos[];
  projectLeads: SelectedLeadType[];
  moreInfos: MoreInfosField[];
  search: string;
  ecosystems: TSelectAutocomplete.Item[];
  projectCategories: TSelectAutocomplete.Item[];
  categorySuggestions: string[];
};
