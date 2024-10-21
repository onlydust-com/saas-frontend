import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { ApplicationsAccordion } from "@/shared/panels/contribution-sidepanel/_features/applications-accordion/applications-accordion";
import { AssignContributorsProps } from "@/shared/panels/contribution-sidepanel/_features/assign-contributors/assign-contributors.types";
import { Kpi } from "@/shared/panels/contribution-sidepanel/_features/kpi/kpi";

export function AssignContributors({ contributionId, repoId }: AssignContributorsProps) {
  const { data: applicationsActiveData } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: contributionId },
    queryParams: {
      isApplicantProjectMember: true,
    },
    options: {
      enabled: !!contributionId,
    },
  });

  const { data: applicationsNewData } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: contributionId },
    queryParams: {
      isApplicantProjectMember: false,
    },
    options: {
      enabled: !!contributionId,
    },
  });

  const { data: applicationsIgnoredData } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: contributionId },
    queryParams: {
      isIgnored: true,
    },
    options: {
      enabled: !!contributionId,
    },
  });

  const activeApplicantsCount = applicationsActiveData?.pages[0].totalItemNumber ?? 0;
  const newApplicantsCount = applicationsNewData?.pages[0].totalItemNumber ?? 0;
  const ignoredApplicantsCount = applicationsIgnoredData?.pages[0].totalItemNumber ?? 0;

  const activeApplicants = applicationsActiveData?.pages.flatMap(page => page.applicants) || [];
  const newApplicants = applicationsNewData?.pages.flatMap(page => page.applicants) || [];
  const ignoredApplicants = applicationsIgnoredData?.pages.flatMap(page => page.applicants) || [];

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
        repoId={repoId}
      />
    </>
  );
}
