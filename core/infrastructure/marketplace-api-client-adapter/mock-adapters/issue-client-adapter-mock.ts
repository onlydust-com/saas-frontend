import { IssueStoragePort } from "@/core/domain/issue/outputs/issue-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class IssueClientAdapterMock implements IssueStoragePort {
  constructor() {}

  routes = {};

  getIssue = mockHttpStorageResponse<IssueStoragePort["getIssue"]>;

  getIssueApplicants = mockHttpStorageResponse<IssueStoragePort["getIssueApplicants"]>;

  updateIssue = mockHttpStorageResponse<IssueStoragePort["updateIssue"]>;
}
