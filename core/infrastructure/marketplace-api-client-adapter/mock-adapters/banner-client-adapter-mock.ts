import { BannerStoragePort } from "@/core/domain/banner/outputs/banner-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class BannerClientAdapterMock implements BannerStoragePort {
  constructor() {}

  routes = {};

  getBanner = mockHttpStorageResponse<BannerStoragePort["getBanner"]>;
}
