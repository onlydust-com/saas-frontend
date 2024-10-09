import { GetCountryResponse } from "@/core/domain/country/country-contract.types";
import { CountryList } from "@/core/domain/country/models/country-list.model";
import { CountryStoragePort } from "@/core/domain/country/outputs/country-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class CountryClientAdapter implements CountryStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getCountry: "country",
  } as const;

  getCountry = () => {
    const path = this.routes["getCountry"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetCountryResponse>({
        path,
        method,
        tag,
      });

      return new CountryList(data);
    };

    return {
      request,
      tag,
    };
  };
}
