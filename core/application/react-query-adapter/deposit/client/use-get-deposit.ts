import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { DepositFacadePort } from "@/core/domain/deposit/input/deposit-facade-port";
import { DepositInterface } from "@/core/domain/deposit/models/deposit-model";

export function useGetDeposit({
  options,
  pathParams,
}: UseQueryFacadeParams<DepositFacadePort["getDeposit"], DepositInterface>) {
  const depositStoragePort = bootstrap.getDepositStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...depositStoragePort.getDeposit({ pathParams }),
      options,
    })
  );
}
