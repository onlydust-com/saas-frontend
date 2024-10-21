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
  contributionId,
  repoId,
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
        <div key={activeApplicant.applicationId} className="!p-none">
          <ApplicationCard application={activeApplicant} contributionId={contributionId} repoId={repoId} />
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
        <div key={newApplicant.applicationId} className="!p-none">
          <ApplicationCard application={newApplicant} contributionId={contributionId} repoId={repoId} />
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
        <div key={ignoredApplicant.applicationId} className="!p-none">
          <ApplicationCard application={ignoredApplicant} contributionId={contributionId} repoId={repoId} isIgnored />
        </div>
      )),
    },
  ];

  return <Accordion items={items} multiple />;
}
