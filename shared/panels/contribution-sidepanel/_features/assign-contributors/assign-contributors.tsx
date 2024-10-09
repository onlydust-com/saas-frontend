import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { ApplicationsAccordion } from "@/shared/panels/contribution-sidepanel/_features/applications-accordion/applications-accordion";
import { AssignContributorsProps } from "@/shared/panels/contribution-sidepanel/_features/assign-contributors/assign-contributors.types";
import { Kpi } from "@/shared/panels/contribution-sidepanel/_features/kpi/kpi";

export function AssignContributors({ contributionId }: AssignContributorsProps) {
  const projectId = "7d04163c-4187-4313-8066-61504d34fc56";

  const { data: applicationsActiveData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId,
      isApplicantProjectMember: true,
      // TODO
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
      // TODO
      // issueId,
    },
    options: {
      enabled: !!projectId,
    },
  });

  const { data: applicationsIgnoredData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId,
      // TODO
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
