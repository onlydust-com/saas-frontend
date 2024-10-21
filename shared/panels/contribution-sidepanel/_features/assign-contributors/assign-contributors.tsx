import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { ApplicationsAccordion } from "@/shared/panels/contribution-sidepanel/_features/applications-accordion/applications-accordion";
import { AssignContributorsProps } from "@/shared/panels/contribution-sidepanel/_features/assign-contributors/assign-contributors.types";
import { Kpi } from "@/shared/panels/contribution-sidepanel/_features/kpi/kpi";

export function AssignContributors({ contributionId, contributionGithubId, repoId }: AssignContributorsProps) {
  const { data: applicationsActiveData } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { issueId: contributionGithubId },
    queryParams: {
      isApplicantProjectMember: true,
    },
    options: {
      enabled: !!contributionGithubId,
    },
  });

  const { data: applicationsNewData } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { issueId: contributionGithubId },
    queryParams: {
      isApplicantProjectMember: false,
    },
    options: {
      enabled: !!contributionGithubId,
    },
  });

  const { data: applicationsIgnoredData } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { issueId: contributionGithubId },
    queryParams: {
      isIgnored: true,
    },
    options: {
      enabled: !!contributionGithubId,
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
