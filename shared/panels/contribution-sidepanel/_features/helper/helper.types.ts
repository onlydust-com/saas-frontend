import { ContributionActivityStatusUnion } from "@/core/domain/contribution/models/contribution.types";

type ContributionActivityPickedStatus = Extract<ContributionActivityStatusUnion, "NOT_ASSIGNED" | "TO_REVIEW">;

export interface HelperProps {
  type: ContributionActivityPickedStatus;
  onClose: () => void;
}
