import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";
import { BillingProfilePayoutInfoInterface } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";

export function useGetBillingProfilePayoutInfoById({
  options,
  pathParams,
}: UseQueryFacadeParams<
  BillingProfileFacadePort["getBillingProfilePayoutInfoById"],
  BillingProfilePayoutInfoInterface
>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...billingProfileStoragePort.getBillingProfilePayoutInfoById({ pathParams }),
      options,
    })
  );
}
