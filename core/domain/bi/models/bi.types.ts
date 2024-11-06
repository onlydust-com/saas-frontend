import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

export type ContributorEngagementStatusesUnion = NonNullable<GetBiContributorsQueryParams["engagementStatuses"]>[0];

export enum ContributorEngagementStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  REACTIVATED = "REACTIVATED",
  CHURNED = "CHURNED",
}
