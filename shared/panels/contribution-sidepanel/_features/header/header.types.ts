import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionAsUnion } from "@/core/domain/contribution/models/contribution.types";

export interface HeaderProps {
  as?: ContributionAsUnion;
  contribution?: ContributionActivityInterface;
  onToggleHelper: () => void;
}
