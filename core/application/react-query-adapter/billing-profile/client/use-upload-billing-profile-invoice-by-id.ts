import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useUploadBillingProfileInvoiceById({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<BillingProfileFacadePort["uploadBillingProfileInvoiceById"], undefined, never, Blob> = {}) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...billingProfileStoragePort.uploadBillingProfileInvoiceById({ pathParams, queryParams }),
      ...options,
    })
  );
}
