import { ApplicationListItemInterface } from "@/core/domain/application/models/application-list-item-model";

export interface ApplicationsAccordionProps {
  activeApplicants: ApplicationListItemInterface[];
  newApplicants: ApplicationListItemInterface[];
  ignoredApplicants: ApplicationListItemInterface[];
}
