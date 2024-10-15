import { IssueApplicantInterface } from "@/core/domain/issue/models/issue-applicant-model";

export interface ApplicationCardProps {
  application: IssueApplicantInterface;
  contributionId: string;
  isIgnored?: boolean;
}
