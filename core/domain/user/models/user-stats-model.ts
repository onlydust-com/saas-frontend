import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserStatsResponse = components["schemas"]["UserProfileStatsV2"];

export interface UserStatsInterface extends UserStatsResponse {}

export class UserStats implements UserStatsInterface {
  activity!: UserStatsResponse["activity"];
  earnings!: UserStatsResponse["earnings"];
  workDistribution!: UserStatsResponse["workDistribution"];

  constructor(props: UserStatsResponse) {
    Object.assign(this, props);
  }
}
