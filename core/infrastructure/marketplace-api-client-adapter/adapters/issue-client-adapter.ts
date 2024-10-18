import {
  GetIssueApplicantsResponse,
  GetIssueResponse,
  UpdateIssueBody,
} from "@/core/domain/issue/issue-contract.types";
import { IssueApplicant } from "@/core/domain/issue/models/issue-applicant-model";
import { Issue } from "@/core/domain/issue/models/issue-model";
import { IssueStoragePort } from "@/core/domain/issue/outputs/issue-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class IssueClientAdapter implements IssueStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getIssue: "issues/:issueId",
    getIssueApplicants: "issues/:issueId/applicants",
    updateIssue: "issues/:issueId",
  } as const;

  getIssue = ({ pathParams }: FirstParameter<IssueStoragePort["getIssue"]>) => {
    const path = this.routes["getIssue"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetIssueResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Issue(data);
    };

    return {
      request,
      tag,
    };
  };

  getIssueApplicants = ({ pathParams, queryParams }: FirstParameter<IssueStoragePort["getIssueApplicants"]>) => {
    const path = this.routes["getIssueApplicants"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetIssueApplicantsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        applicants: data.applicants.map(applicant => new IssueApplicant(applicant)),
      };
    };

    return {
      request,
      tag,
    };
  };

  updateIssue = ({ pathParams }: FirstParameter<IssueStoragePort["updateIssue"]>) => {
    const path = this.routes["updateIssue"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: UpdateIssueBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}
