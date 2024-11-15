import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetBillingProfileInvoiceableRewardsModel } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useGetBillingProfileInvoiceableRewards({
  pathParams,
  options,
}: UseQueryFacadeParams<
  BillingProfileFacadePort["getBillingProfileInvoiceableRewards"],
  GetBillingProfileInvoiceableRewardsModel
>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...billingProfileStoragePort.getBillingProfileInvoiceableRewards({ pathParams }),
      options,
    })
  );
}
