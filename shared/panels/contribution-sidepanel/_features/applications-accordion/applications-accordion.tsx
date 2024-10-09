import { Accordion } from "@/design-system/molecules/accordion";

import { Translate } from "@/shared/translation/components/translate/translate";

import { ApplicationCard } from "../application-card/application-card";
import { ApplicationsAccordionProps } from "./applications-accordion.types";

export function ApplicationsAccordion({
  activeApplicants,
  activeApplicantsCount,
  newApplicants,
  newApplicantsCount,
  ignoredApplicants,
  ignoredApplicantsCount,
}: ApplicationsAccordionProps) {
  const items = [
    {
      id: "active",
      titleProps: {
        children: <Translate token="panels:contribution.applications.items.active" />,
      },
      badgeProps: {
        children: activeApplicantsCount,
      },
      content: activeApplicants?.map(activeApplicant => (
        <div key={activeApplicant.id}>
          <ApplicationCard application={activeApplicant} />
        </div>
      )),
    },
    {
      id: "new",
      titleProps: {
        children: <Translate token="panels:contribution.applications.items.new" />,
      },
      badgeProps: {
        children: newApplicantsCount,
      },
      content: newApplicants?.map(newApplicant => (
        <div key={newApplicant.id}>
          <ApplicationCard application={newApplicant} />
        </div>
      )),
    },
    {
      id: "ignored",
      titleProps: {
        children: <Translate token="panels:contribution.applications.items.ignored" />,
      },
      badgeProps: {
        children: ignoredApplicantsCount,
      },
      content: ignoredApplicants?.map(ignoredApplicant => (
        <div key={ignoredApplicant.id}>
          <ApplicationCard application={ignoredApplicant} />
        </div>
      )),
    },
  ];

  return <Accordion items={items} multiple />;
}
