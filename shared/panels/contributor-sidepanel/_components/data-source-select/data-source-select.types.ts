import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface DataSourceSelectProps extends SelectExtendedProps {
  user: BiContributorInterface;
  onSelect?: (projectsIds: string[], source?: "ALL" | "ONLYDUST") => void;
  selectedProjects?: string[];
  selectedSource?: "ALL" | "ONLYDUST";
}
