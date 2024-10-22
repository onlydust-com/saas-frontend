import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type RewardListItemResponse = components["schemas"]["RewardPageItemResponse"];

export interface RewardListItemV2Interface extends RewardListItemResponse {}

export class RewardListItemV2 implements RewardListItemV2Interface {
  id!: RewardListItemResponse["id"];
  amount!: RewardListItemResponse["amount"];
  status!: RewardListItemResponse["status"];
  from!: RewardListItemResponse["from"];
  to!: RewardListItemResponse["to"];
  requestedAt!: RewardListItemResponse["requestedAt"];
  processedAt!: RewardListItemResponse["processedAt"];
  unlockDate!: RewardListItemResponse["unlockDate"];
  project!: RewardListItemResponse["project"];
  billingProfileId!: RewardListItemResponse["billingProfileId"];

  constructor(props: RewardListItemResponse) {
    Object.assign(this, props);
  }
}
