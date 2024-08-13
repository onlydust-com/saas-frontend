import { TransactionStoragePort } from "@/core/domain/transaction/outputs/transaction-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class TransactionClientAdapterMock implements TransactionStoragePort {
  constructor() {}

  routes = {};

  getTransaction = mockHttpStorageResponse<TransactionStoragePort["getTransaction"]>;
}
