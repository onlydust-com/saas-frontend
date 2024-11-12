import {
  AcceptOrDeclineBillingProfileMandateBody,
  GetBillingProfileByIdResponse,
  GetBillingProfilePayoutInfoByIdResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfile } from "@/core/domain/billing-profile/models/billing-profile-model";
import { BillingProfilePayoutInfo } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";
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
    impersonationHeaders,
  }: FirstParameter<BillingProfileStoragePort["getBillingProfileInvoicePreviewById"]>) => {
    const path = this.routes["getBillingProfileInvoicePreviewById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<Blob>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          accept: "application/pdf",
          ...(impersonationHeaders ? { "X-Impersonation-Claims": impersonationHeaders } : {}),
        },
      });

      return data;
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
}
