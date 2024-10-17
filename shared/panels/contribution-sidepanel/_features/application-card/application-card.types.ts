import { IssueApplicantInterface } from "@/core/domain/issue/models/issue-applicant-model";

export interface ApplicationCardProps {
  application: IssueApplicantInterface;
  contributionGithubId: number;
  isIgnored?: boolean;
}
