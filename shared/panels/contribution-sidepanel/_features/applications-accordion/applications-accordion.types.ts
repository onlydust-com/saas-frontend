import { ApplicationListItemInterface } from "@/core/domain/application/models/application-list-item-model";

export interface ApplicationsAccordionProps {
  activeApplicants: ApplicationListItemInterface[];
  applicantsActiveNumber: number;
  newApplicants: ApplicationListItemInterface[];
  applicantsNewNumber: number;
  ignoredApplicants: ApplicationListItemInterface[];
  applicantsIgnoredNumber: number;
}
