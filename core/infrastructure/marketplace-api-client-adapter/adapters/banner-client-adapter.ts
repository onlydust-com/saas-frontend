import { GetBannerResponse } from "@/core/domain/banner/banner-contract.types";
import { Banner } from "@/core/domain/banner/models/banner-model";
import { BannerStoragePort } from "@/core/domain/banner/outputs/banner-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class BannerClientAdapter implements BannerStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBanner: "banner",
  } as const;

  getBanner = ({ queryParams }: FirstParameter<BannerStoragePort["getBanner"]>) => {
    const path = this.routes["getBanner"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBannerResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return new Banner(data);
    };

    return {
      request,
      tag,
    };
  };
}
