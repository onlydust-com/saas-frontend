import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

export type ContributorActivityStatusesUnion = GetBiContributorsQueryParams["activityStatuses"];

export enum ContributorActivityStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  REACTIVATED = "REACTIVATED",
  CHURNED = "CHURNED",
}
