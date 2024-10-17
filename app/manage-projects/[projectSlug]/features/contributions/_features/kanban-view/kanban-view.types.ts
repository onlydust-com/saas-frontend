import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";

export interface KanbanViewProps {
  queryParams: Partial<GetContributionsQueryParams>;
  onOpenContribution(githubId: number): void;
}
