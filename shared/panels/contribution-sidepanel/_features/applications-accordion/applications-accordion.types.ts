import { ApplicationListItemInterface } from "@/core/domain/application/models/application-list-item-model";

export interface ApplicationsAccordionProps {
  activeApplicants: ApplicationListItemInterface[];
  activeApplicantsCount: number;
  newApplicants: ApplicationListItemInterface[];
  newApplicantsCount: number;
  ignoredApplicants: ApplicationListItemInterface[];
  ignoredApplicantsCount: number;
  contributionId: string;
}
