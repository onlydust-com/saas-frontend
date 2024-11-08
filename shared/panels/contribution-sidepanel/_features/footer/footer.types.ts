import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionAsUnion } from "@/core/domain/contribution/models/contribution.types";

export interface FooterProps {
  contribution: ContributionActivityInterface;
  as?: ContributionAsUnion;
}

export interface UseContributionPanelFooter {
  contribution: ContributionActivityInterface;
  as?: ContributionAsUnion;
  setIsManageApplicantsModalOpen?: (isOpen: boolean) => void;
}
