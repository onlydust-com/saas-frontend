import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { SelectExtendedProps } from "@/design-system/molecules/select";

export enum DateSourceSelect {
  ALL = "ALL",
  ONLYDUST = "ONLYDUST",
}
export interface DataSourceSelectProps extends SelectExtendedProps {
  user: BiContributorInterface;
  onSelect?: (projectsIds: string[], source?: DateSourceSelect) => void;
  selectedProjects?: string[];
  selectedSource?: DateSourceSelect;
}
