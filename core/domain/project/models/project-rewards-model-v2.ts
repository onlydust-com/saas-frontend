import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProjectRewardsResponseV2 = components["schemas"]["RewardsPageItemResponseV2"];

export interface ProjectRewardsInterfaceV2 extends ProjectRewardsResponseV2 {}

export class ProjectRewardsV2 implements ProjectRewardsInterfaceV2 {
  id!: ProjectRewardsResponseV2["id"];
  requestedAt!: ProjectRewardsResponseV2["requestedAt"];
  from!: ProjectRewardsResponseV2["from"];
  to!: ProjectRewardsResponseV2["to"];
  amount!: ProjectRewardsResponseV2["amount"];
  contributionCount!: ProjectRewardsResponseV2["contributionCount"];

  constructor(props: ProjectRewardsResponseV2) {
    Object.assign(this, props);
  }
}
