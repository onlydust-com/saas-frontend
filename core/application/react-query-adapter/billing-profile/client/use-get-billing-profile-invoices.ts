import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBillingProfileInvoicesModel } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useGetBillingProfileInvoices({
  queryParams,
  pathParams,
  options,
}: UseInfiniteQueryFacadeParams<
  BillingProfileFacadePort["getBillingProfileInvoices"],
  GetBillingProfileInvoicesModel
>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<BillingProfileFacadePort["getBillingProfileInvoices"], GetBillingProfileInvoicesModel>({
      queryParams,
      pathParams,
      options,
      httpStorage: billingProfileStoragePort.getBillingProfileInvoices,
    })
  );
}
