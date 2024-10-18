import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type CountryResponse = components["schemas"]["CountryResponse"];

export interface CountryInterface extends CountryResponse {}

export class Country implements CountryInterface {
  code!: CountryResponse["code"];

  constructor(props: CountryResponse) {
    Object.assign(this, props);
  }
}
