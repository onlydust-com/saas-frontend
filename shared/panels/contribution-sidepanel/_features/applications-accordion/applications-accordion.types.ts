import { IssueApplicantInterface } from "@/core/domain/issue/models/issue-applicant-model";

export interface ApplicationsAccordionProps {
  activeApplicants: IssueApplicantInterface[];
  activeApplicantsCount: number;
  newApplicants: IssueApplicantInterface[];
  newApplicantsCount: number;
  ignoredApplicants: IssueApplicantInterface[];
  ignoredApplicantsCount: number;
  contributionId: string;
}
