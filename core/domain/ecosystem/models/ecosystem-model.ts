import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type EcosystemResponse = components["schemas"]["EcosystemResponseV2"];

export interface EcosystemInterface extends EcosystemResponse {}

export class Ecosystem implements EcosystemInterface {
  id!: EcosystemResponse["id"];
  slug!: EcosystemResponse["slug"];
  name!: EcosystemResponse["name"];
  description!: EcosystemResponse["description"];
  banners!: EcosystemResponse["banners"];
  overview!: EcosystemResponse["overview"];
  languages!: EcosystemResponse["languages"];
  links!: EcosystemResponse["links"];
  contributorCount!: EcosystemResponse["contributorCount"];
  availableIssueCount!: EcosystemResponse["availableIssueCount"];
  mergedPrCount!: EcosystemResponse["mergedPrCount"];
  projectCount!: EcosystemResponse["projectCount"];
  documentations!: EcosystemResponse["documentations"];
  activeContributorCount!: EcosystemResponse["activeContributorCount"];
  activeProjectCount!: EcosystemResponse["activeProjectCount"];

  constructor(props: EcosystemResponse) {
    Object.assign(this, props);
  }
}
