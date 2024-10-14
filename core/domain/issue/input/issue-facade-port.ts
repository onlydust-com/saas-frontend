import {
  GetIssueApplicantsPortParams,
  GetIssueApplicantsPortResponse,
  GetIssuePortParams,
  GetIssuePortResponse,
} from "@/core/domain/issue/issue-contract.types";

export interface IssueFacadePort {
  getIssue(p: GetIssuePortParams): GetIssuePortResponse;
  getIssueApplicants(p: GetIssueApplicantsPortParams): GetIssueApplicantsPortResponse;
}
