import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileFacadePort } from "@/core/domain/billing-profile/input/billing-profile-facade-port";
import { BillingProfileInterface } from "@/core/domain/billing-profile/models/billing-profile-model";

export function useGetBillingProfileById({
  options,
  pathParams,
}: UseQueryFacadeParams<BillingProfileFacadePort["getBillingProfileById"], BillingProfileInterface>) {
  const billingProfileStoragePort = bootstrap.getBillingProfileStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...billingProfileStoragePort.getBillingProfileById({ pathParams }),
      options,
    })
  );
}
