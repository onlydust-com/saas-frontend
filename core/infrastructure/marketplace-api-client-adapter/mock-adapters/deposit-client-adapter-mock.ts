import { DepositStoragePort } from "@/core/domain/deposit/outputs/deposit-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class DepositClientAdapterMock implements DepositStoragePort {
  constructor() {}

  routes = {};

  previewDeposit = mockHttpStorageResponse<DepositStoragePort["previewDeposit"]>;

  updateDeposit = mockHttpStorageResponse<DepositStoragePort["updateDeposit"]>;
}
