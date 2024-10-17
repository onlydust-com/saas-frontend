import {
  GetIssueApplicantsPortParams,
  GetIssueApplicantsPortResponse,
  GetIssuePortParams,
  GetIssuePortResponse,
  UpdateIssuePortParams,
  UpdateIssuePortResponse,
} from "@/core/domain/issue/issue-contract.types";

export interface IssueStoragePort {
  routes: Record<string, string>;
  getIssue(p: GetIssuePortParams): GetIssuePortResponse;
  getIssueApplicants(p: GetIssueApplicantsPortParams): GetIssueApplicantsPortResponse;
  updateIssue(p: UpdateIssuePortParams): UpdateIssuePortResponse;
}
