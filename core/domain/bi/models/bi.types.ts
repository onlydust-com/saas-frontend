import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

export type ContributorActivityStatusesUnion = NonNullable<GetBiContributorsQueryParams["activityStatuses"]>[0];

export enum ContributorActivityStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  REACTIVATED = "REACTIVATED",
  CHURNED = "CHURNED",
}
