import { Country } from "@/core/domain/country/models/country-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type CountryListsResponse = components["schemas"]["CountriesResponse"];

export interface CountryListInterface extends CountryListsResponse {}

export class CountryList implements CountryListInterface {
  countries!: CountryListsResponse["countries"];

  constructor(props: CountryListsResponse) {
    Object.assign(this, props);

    this.countries = props.countries.map(country => new Country(country));
  }
}
