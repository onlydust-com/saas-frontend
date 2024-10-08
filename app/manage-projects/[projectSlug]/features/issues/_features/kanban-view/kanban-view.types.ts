import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

export interface KanbanViewProps {
  queryParams: Partial<GetBiContributorsQueryParams>;
  onOpenSandboxPanel(id: string): void;
}
