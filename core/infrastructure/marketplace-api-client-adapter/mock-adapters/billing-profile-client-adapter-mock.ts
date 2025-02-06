import { BillingProfileStoragePort } from "@/core/domain/billing-profile/outputs/billing-profile-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class BillingProfileClientAdapterMock implements BillingProfileStoragePort {
  constructor() {}

  routes = {};

  getBillingProfileById = mockHttpStorageResponse<BillingProfileStoragePort["getBillingProfileById"]>;

  getBillingProfilePayoutInfoById = mockHttpStorageResponse<
    BillingProfileStoragePort["getBillingProfilePayoutInfoById"]
  >;

  getBillingProfileInvoicePreviewById = mockHttpStorageResponse<
    BillingProfileStoragePort["getBillingProfileInvoicePreviewById"]
  >;

  uploadBillingProfileInvoiceById = mockHttpStorageResponse<
    BillingProfileStoragePort["uploadBillingProfileInvoiceById"]
  >;

  downloadBillingProfileInvoiceById = mockHttpStorageResponse<
    BillingProfileStoragePort["downloadBillingProfileInvoiceById"]
  >;

  acceptOrDeclineBillingProfileMandateById = mockHttpStorageResponse<
    BillingProfileStoragePort["acceptOrDeclineBillingProfileMandateById"]
  >;

  getMyBillingProfiles = mockHttpStorageResponse<BillingProfileStoragePort["getMyBillingProfiles"]>;

  getBillingProfileInvoiceableRewards = mockHttpStorageResponse<
    BillingProfileStoragePort["getBillingProfileInvoiceableRewards"]
  >;

  getBillingProfileInvoices = mockHttpStorageResponse<BillingProfileStoragePort["getBillingProfileInvoices"]>;

  acceptOrRejectCoworkerInvitation = mockHttpStorageResponse<
    BillingProfileStoragePort["acceptOrRejectCoworkerInvitation"]
  >;

  deleteBillingProfile = mockHttpStorageResponse<BillingProfileStoragePort["deleteBillingProfile"]>;

  enableBillingProfile = mockHttpStorageResponse<BillingProfileStoragePort["enableBillingProfile"]>;

  removeCoworkerFromBillingProfile = mockHttpStorageResponse<
    BillingProfileStoragePort["removeCoworkerFromBillingProfile"]
  >;
}
