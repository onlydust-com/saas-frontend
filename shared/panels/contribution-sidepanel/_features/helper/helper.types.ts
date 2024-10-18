import { ContributionActivityStatusUnion } from "@/core/domain/contribution/models/contribution.types";

export interface HelperProps {
  type: ContributionActivityStatusUnion;
  open: boolean;
  onClose: () => void;
}
