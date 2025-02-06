import {
  AcceptOrDeclineBillingProfileMandateBody,
  AcceptOrRejectCoworkerInvitationBody,
  EnableBillingProfileBody,
  CreateBillingProfileBody,
  GetBillingProfileByIdResponse,
  GetBillingProfileInvoicePreviewByIdResponse,
  GetBillingProfileInvoiceableRewardsResponse,
  GetBillingProfileInvoicesResponse,
  GetBillingProfilePayoutInfoByIdResponse,
  GetMeBillingProfilesResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileInvoice } from "@/core/domain/billing-profile/models/billing-profile-invoice-model";
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
    getBillingProfileById: "billing-profiles/:billingProfileId",
    getBillingProfilePayoutInfoById: "billing-profiles/:billingProfileId/payout-info",
    getBillingProfileInvoicePreviewById: "billing-profiles/:billingProfileId/invoice-preview",
    uploadBillingProfileInvoiceById: "billing-profiles/:billingProfileId/invoices/:invoiceId",
    downloadBillingProfileInvoiceById: "billing-profiles/:billingProfileId/invoices/:invoiceId",
    acceptOrDeclineBillingProfileMandateById: "billing-profiles/:billingProfileId/invoices/mandate",
    getMyBillingProfiles: "me/billing-profiles",
    getBillingProfileInvoiceableRewards: "billing-profiles/:billingProfileId/invoiceable-rewards",
    getBillingProfileInvoices: "billing-profiles/:billingProfileId/invoices",
    acceptOrRejectCoworkerInvitation: "me/billing-profiles/:billingProfileId/invitations",
    deleteBillingProfile: "billing-profiles/:billingProfileId",
    enableBillingProfile: "billing-profiles/:billingProfileId/enable",
    removeCoworkerFromBillingProfile: "billing-profiles/:billingProfileId/coworkers/:githubUserId",
    createBillingProfile: "billing-profiles",
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
    const request = async (body: Blob) =>
      this.client.request<Blob>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          "Content-Type": "application/pdf",
        },
        body,
      });

    return {
      request,
      tag,
    };
  };

  downloadBillingProfileInvoiceById = ({
    pathParams,
    queryParams,
  }: FirstParameter<BillingProfileStoragePort["downloadBillingProfileInvoiceById"]>) => {
    const path = this.routes["downloadBillingProfileInvoiceById"];
    const method = "GET";
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

  getBillingProfileInvoices = ({
    pathParams,
    queryParams,
  }: FirstParameter<BillingProfileStoragePort["getBillingProfileInvoices"]>) => {
    const path = this.routes["getBillingProfileInvoices"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBillingProfileInvoicesResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        invoices: data.invoices.map(invoice => new BillingProfileInvoice(invoice)),
      };
    };

    return {
      request,
      tag,
    };
  };

  acceptOrRejectCoworkerInvitation = ({
    pathParams,
  }: FirstParameter<BillingProfileStoragePort["acceptOrRejectCoworkerInvitation"]>) => {
    const path = this.routes["acceptOrRejectCoworkerInvitation"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AcceptOrRejectCoworkerInvitationBody) =>
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

  deleteBillingProfile = ({ pathParams }: FirstParameter<BillingProfileStoragePort["deleteBillingProfile"]>) => {
    const path = this.routes["deleteBillingProfile"];
    const method = "DELETE";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  enableBillingProfile = ({ pathParams }: FirstParameter<BillingProfileStoragePort["enableBillingProfile"]>) => {
    const path = this.routes["enableBillingProfile"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: EnableBillingProfileBody) =>
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

  removeCoworkerFromBillingProfile = ({
    pathParams,
  }: FirstParameter<BillingProfileStoragePort["removeCoworkerFromBillingProfile"]>) => {
    const path = this.routes["removeCoworkerFromBillingProfile"];
    const method = "DELETE";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  createBillingProfile = ({ pathParams }: FirstParameter<BillingProfileStoragePort["createBillingProfile"]>) => {
    const path = this.routes["createBillingProfile"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: CreateBillingProfileBody) =>
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
}
