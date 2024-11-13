import {
  AcceptOrDeclineBillingProfileMandateBody,
  GetBillingProfileByIdResponse,
  GetBillingProfileInvoicePreviewByIdResponse,
  GetBillingProfileInvoiceableRewardsResponse,
  GetBillingProfilePayoutInfoByIdResponse,
  GetMeBillingProfilesResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileInvoicePreview } from "@/core/domain/billing-profile/models/billing-profile-invoice-preview-model";
import { BillingProfileInvoiceableReward } from "@/core/domain/billing-profile/models/billing-profile-invoiceable-rewards-model";
import { BillingProfile } from "@/core/domain/billing-profile/models/billing-profile-model";
import { BillingProfilePayoutInfo } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";
import { BillingProfileShort } from "@/core/domain/billing-profile/models/billing-profile-short-model";
import { BillingProfileStoragePort } from "@/core/domain/billing-profile/outputs/billing-profile-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class BillingProfileClientAdapter implements BillingProfileStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBillingProfileById: "billingProfile/:billingProfileId",
    getBillingProfilePayoutInfoById: "billingProfile/:billingProfileId/payout-info",
    getBillingProfileInvoicePreviewById: "billingProfile/:billingProfileId/invoice-preview",
    uploadBillingProfileInvoiceById: "billingProfile/:billingProfileId/invoices/:invoiceId",
    acceptOrDeclineBillingProfileMandateById: "billingProfile/:billingProfileId/invoices/mandate",
    getMyBillingProfiles: "me/billing-profiles",
    getBillingProfileInvoiceableRewards: "billingProfile/:billingProfileId/invoiceable-rewards",
  } as const;

  getBillingProfileById = ({ pathParams }: FirstParameter<BillingProfileStoragePort["getBillingProfileById"]>) => {
    const path = this.routes["getBillingProfileById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetBillingProfileByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new BillingProfile(data);
    };

    return {
      request,
      tag,
    };
  };

  getBillingProfilePayoutInfoById = ({
    pathParams,
  }: FirstParameter<BillingProfileStoragePort["getBillingProfilePayoutInfoById"]>) => {
    const path = this.routes["getBillingProfilePayoutInfoById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetBillingProfilePayoutInfoByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new BillingProfilePayoutInfo(data);
    };

    return {
      request,
      tag,
    };
  };

  getBillingProfileInvoicePreviewById = ({
    pathParams,
    queryParams,
  }: FirstParameter<BillingProfileStoragePort["getBillingProfileInvoicePreviewById"]>) => {
    const path = this.routes["getBillingProfileInvoicePreviewById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBillingProfileInvoicePreviewByIdResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          accept: "application/pdf",
        },
      });

      return new BillingProfileInvoicePreview(data);
    };

    return {
      request,
      tag,
    };
  };

  uploadBillingProfileInvoiceById = ({
    pathParams,
    queryParams,
  }: FirstParameter<BillingProfileStoragePort["uploadBillingProfileInvoiceById"]>) => {
    const path = this.routes["uploadBillingProfileInvoiceById"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () =>
      this.client.request<Blob>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          "Content-Type": "application/pdf",
        },
      });

    return {
      request,
      tag,
    };
  };

  acceptOrDeclineBillingProfileMandateById = ({
    pathParams,
  }: FirstParameter<BillingProfileStoragePort["acceptOrDeclineBillingProfileMandateById"]>) => {
    const path = this.routes["acceptOrDeclineBillingProfileMandateById"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AcceptOrDeclineBillingProfileMandateBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyBillingProfiles = () => {
    const path = this.routes["getMyBillingProfiles"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetMeBillingProfilesResponse>({
        path,
        method,
        tag,
      });

      return {
        ...data,
        billingProfiles: data.billingProfiles?.map(billingProfile => new BillingProfileShort(billingProfile)) ?? [],
      };
    };

    return {
      request,
      tag,
    };
  };

  getBillingProfileInvoiceableRewards = ({
    pathParams,
  }: FirstParameter<BillingProfileStoragePort["getBillingProfileInvoiceableRewards"]>) => {
    const path = this.routes["getBillingProfileInvoiceableRewards"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetBillingProfileInvoiceableRewardsResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return {
        ...data,
        rewards: data.rewards.map(reward => new BillingProfileInvoiceableReward(reward)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
