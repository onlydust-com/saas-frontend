import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

export interface ListViewProps {
  queryParams: Partial<GetBiContributorsQueryParams>;
  onOpenSandboxPanel(id: string): void;
}
