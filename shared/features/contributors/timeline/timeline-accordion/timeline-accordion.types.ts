import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { TimelineFilters } from "@/shared/features/contributors/timeline/timeline";

export interface TimelineAccordionProps {
  user: BiContributorInterface;
  start: Date;
  end: Date;
  isFirst: boolean;
  filters: TimelineFilters;
  search?: string;
}
