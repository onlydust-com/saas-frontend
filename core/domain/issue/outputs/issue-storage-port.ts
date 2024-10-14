import {
  GetIssueApplicantsPortParams,
  GetIssueApplicantsPortResponse,
  GetIssuePortParams,
  GetIssuePortResponse,
} from "@/core/domain/issue/issue-contract.types";

export interface IssueStoragePort {
  routes: Record<string, string>;
  getIssue(p: GetIssuePortParams): GetIssuePortResponse;
  getIssueApplicants(p: GetIssueApplicantsPortParams): GetIssueApplicantsPortResponse;
}
