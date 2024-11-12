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

  acceptOrDeclineBillingProfileMandateById = mockHttpStorageResponse<
    BillingProfileStoragePort["acceptOrDeclineBillingProfileMandateById"]
  >;
}
