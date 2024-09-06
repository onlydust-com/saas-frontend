import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SponsorResponse = components["schemas"]["SponsorResponse"];

export interface SponsorInterface extends SponsorResponse {}

export class Sponsor implements SponsorInterface {
  id!: SponsorInterface["id"];
  name!: SponsorInterface["name"];
  logoUrl!: SponsorInterface["logoUrl"];
  url!: SponsorInterface["url"];
  totalDeposited!: SponsorInterface["totalDeposited"];
  totalAvailable!: SponsorInterface["totalAvailable"];
  totalGranted!: SponsorInterface["totalGranted"];
  totalRewarded!: SponsorInterface["totalRewarded"];

  constructor(props: SponsorResponse) {
    Object.assign(this, props);
  }
}
