import { BannerInterface } from "@/core/domain/banner/models/banner-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Get Banner -------------------------------- */

export type GetBannerResponse = components["schemas"]["BannerResponse"];

export type GetBannerPortParams = HttpClientParameters<object>;

export type GetBannerPortResponse = HttpStorageResponse<BannerInterface>;
