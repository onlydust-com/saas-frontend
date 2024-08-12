import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProgramClientAdapterMock implements ProgramStoragePort {
  constructor() {}

  routes = {};

  getProgram = mockHttpStorageResponse<ProgramStoragePort["getProgram"]>;
}
