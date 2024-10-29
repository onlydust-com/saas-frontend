import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

export interface TimelineAccordionProps {
  user: BiContributorInterface;
  start: Date;
  end: Date;
  isFirst: boolean;
}
