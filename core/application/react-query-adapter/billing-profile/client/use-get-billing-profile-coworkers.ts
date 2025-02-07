import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBillingProfileCoworkersModel } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useGetBillingProfileCoworkers({
  queryParams,
  pathParams,
  options,
}: UseInfiniteQueryFacadeParams<
  BillingProfileFacadePort["getBillingProfileCoworkers"],
  GetBillingProfileCoworkersModel
>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<BillingProfileFacadePort["getBillingProfileCoworkers"], GetBillingProfileCoworkersModel>({
      queryParams,
      pathParams,
      options,
      httpStorage: billingProfileStoragePort.getBillingProfileCoworkers,
    })
  );
}
