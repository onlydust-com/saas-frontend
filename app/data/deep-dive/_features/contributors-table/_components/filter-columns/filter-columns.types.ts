import { BiContributorResponse } from "@/core/domain/bi/models/bi-contributor-model";

export interface FilterColumnsProps {
  selectedIds?: Array<keyof BiContributorResponse>;
  setSelectedIds: (ids: Array<keyof BiContributorResponse>) => void;
}
