import { ContributionAsUnion } from "@/core/domain/contribution/models/contribution.types";

export interface ContributionsPanelData {
  id: string;
  as?: ContributionAsUnion;
}
