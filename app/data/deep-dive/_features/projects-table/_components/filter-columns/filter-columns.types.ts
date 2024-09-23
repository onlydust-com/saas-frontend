import { BiProjectResponse } from "@/core/domain/bi/models/bi-project-model";

export interface FilterColumnsProps {
  selectedIds?: Array<keyof BiProjectResponse>;
  setSelectedIds: (ids: Array<keyof BiProjectResponse>) => void;
}
