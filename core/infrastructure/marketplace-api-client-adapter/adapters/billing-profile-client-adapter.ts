import {
  GetBillingProfileByIdResponse,
  GetBillingProfilePayoutInfoByIdResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfile } from "@/core/domain/billing-profile/models/billing-profile-model";
import { BillingProfilePayoutInfo } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";
import { BillingProfileStoragePort } from "@/core/domain/billing-profile/outputs/billing-profile-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class BillingProfileClientAdapter implements BillingProfileStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBillingProfileById: "billingProfile/:billingProfileId",
    getBillingProfilePayoutInfoById: "billingProfile/:billingProfileId/payout-info",
  } as const;

  getBillingProfileById = () => {
    const path = this.routes["getBillingProfileById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetBillingProfileByIdResponse>({
        path,
        method,
        tag,
      });

      return new BillingProfile(data);
    };

    return {
      request,
      tag,
    };
  };

  getBillingProfilePayoutInfoById = () => {
    const path = this.routes["getBillingProfilePayoutInfoById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetBillingProfilePayoutInfoByIdResponse>({
        path,
        method,
        tag,
      });

      return new BillingProfilePayoutInfo(data);
    };

    return {
      request,
      tag,
    };
  };
}
