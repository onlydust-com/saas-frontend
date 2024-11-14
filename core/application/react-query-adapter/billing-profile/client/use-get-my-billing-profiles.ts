import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetMeBillingProfilesModel } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";

export function useGetMyBillingProfiles({
  options,
}: UseQueryFacadeParams<BillingProfileFacadePort["getMyBillingProfiles"], GetMeBillingProfilesModel>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...billingProfileStoragePort.getMyBillingProfiles({}),
      options,
    })
  );
}
