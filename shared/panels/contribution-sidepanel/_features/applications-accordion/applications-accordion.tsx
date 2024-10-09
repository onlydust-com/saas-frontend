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
        <ApplicationCard key={activeApplicant.id} application={activeApplicant} />
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
      content: newApplicants?.map(newApplicant => <ApplicationCard key={newApplicant.id} application={newApplicant} />),
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
        <ApplicationCard key={ignoredApplicant.id} application={ignoredApplicant} />
      )),
    },
  ];

  return <Accordion items={items} multiple />;
}
