import { Accordion } from "@/design-system/molecules/accordion";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ApplicationCard } from "../application-card/application-card";
import { ApplicationsAccordionProps } from "./applications-accordion.types";

export function ApplicationsAccordion({
  activeApplicants,
  newApplicants,
  ignoredApplicants,
}: ApplicationsAccordionProps) {
  const items = [
    {
      id: "active",
      titleProps: {
        children: <Translate token="panels:contribution.applications.items.active" />,
      },
      badgeProps: {
        children: 2,
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
        children: 9,
      },
      content: newApplicants?.map(newApplicant => <ApplicationCard key={newApplicant.id} application={newApplicant} />),
    },
    {
      id: "ignored",
      titleProps: {
        children: <Translate token="panels:contribution.applications.items.ignored" />,
      },
      badgeProps: {
        children: 1,
      },
      content: ignoredApplicants?.map(ignoredApplicant => (
        <ApplicationCard key={ignoredApplicant.id} application={ignoredApplicant} />
      )),
    },
  ];

  return (
    <ScrollView>
      <Accordion items={items} multiple />
    </ScrollView>
  );
}
