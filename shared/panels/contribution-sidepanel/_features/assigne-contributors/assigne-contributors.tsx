import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { ApplicationsAccordion } from "@/shared/panels/contribution-sidepanel/_features/applications-accordion/applications-accordion";
import { Kpi } from "@/shared/panels/contribution-sidepanel/_features/kpi/kpi";

import { AssigneContributorsProps } from "./assigne-contributors.types";

export function AssigneContributors({ issueId, contributionId }: AssigneContributorsProps) {
  const projectId = "7d04163c-4187-4313-8066-61504d34fc56";

  const { data: applicationsActiveData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId,
      isApplicantProjectMember: true,
      // issueId,
    },
    options: {
      enabled: !!projectId,
    },
  });

  const { data: applicationsNewData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId,
      isApplicantProjectMember: false,
      // issueId,
    },
    options: {
      enabled: !!projectId,
    },
  });

  const { data: applicationsIgnoredData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId,
      // issueId,
      isIgnored: true,
    },
    options: {
      enabled: !!projectId,
    },
  });

  const activeApplicantsCount = applicationsActiveData?.pages[0].totalItemNumber ?? 0;
  const newApplicantsCount = applicationsNewData?.pages[0].totalItemNumber ?? 0;
  const ignoredApplicantsCount = applicationsIgnoredData?.pages[0].totalItemNumber ?? 0;

  const activeApplicants = applicationsActiveData?.pages.flatMap(page => page.applications) || [];
  const newApplicants = applicationsNewData?.pages.flatMap(page => page.applications) || [];
  const ignoredApplicants = applicationsIgnoredData?.pages.flatMap(page => page.applications) || [];

  return (
    <>
      <Kpi
        applicants={activeApplicantsCount + newApplicantsCount + ignoredApplicantsCount}
        projectContributors={activeApplicantsCount}
        newContributors={newApplicantsCount}
      />
      <ApplicationsAccordion
        activeApplicants={activeApplicants}
        activeApplicantsCount={activeApplicantsCount}
        newApplicants={newApplicants}
        newApplicantsCount={newApplicantsCount}
        ignoredApplicants={ignoredApplicants}
        ignoredApplicantsCount={ignoredApplicantsCount}
        contributionId={contributionId}
      />
    </>
  );
}
