import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useDownloadBillingProfileInvoiceById({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<BillingProfileFacadePort["downloadBillingProfileInvoiceById"], Blob>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...billingProfileStoragePort.downloadBillingProfileInvoiceById({ pathParams, queryParams }),
      options,
    })
  );
}
