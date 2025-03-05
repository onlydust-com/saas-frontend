import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type TailoredDiscoveriesResponse = components["schemas"]["TailoredDiscoveriesResponse"];

export interface TailoredDiscoveriesInterface extends TailoredDiscoveriesResponse {}

export class TailoredDiscoveries implements TailoredDiscoveriesInterface {
  hasSufficientData!: TailoredDiscoveriesResponse["hasSufficientData"];
  sections!: TailoredDiscoveriesResponse["sections"];

  constructor(props: TailoredDiscoveriesResponse) {
    Object.assign(this, props);
  }
}
