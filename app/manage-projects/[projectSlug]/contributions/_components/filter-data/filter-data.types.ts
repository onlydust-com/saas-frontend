import { GetContributionsPortParams } from "@/core/domain/contribution/contribution-contract.types";

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;
