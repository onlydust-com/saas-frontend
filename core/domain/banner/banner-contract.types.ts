import { BannerInterface } from "@/core/domain/banner/models/banner-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Get Banner -------------------------------- */

export type GetBannerResponse = components["schemas"]["BannerResponse"];

export type GetBannerQueryParams = operations["getBanner"]["parameters"]["query"];

export type GetBannerPortParams = HttpClientParameters<{
  QueryParams: GetBannerQueryParams;
}>;

export type GetBannerPortResponse = HttpStorageResponse<BannerInterface>;
