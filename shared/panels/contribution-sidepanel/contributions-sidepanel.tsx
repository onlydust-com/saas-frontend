import { useParams } from "next/navigation";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { IssuesSearchSidepanel } from "@/shared/panels/contribution-sidepanel/_features/issues-search-sidepanel/issues-search-sidepanel";
import { LinkedIssues } from "@/shared/panels/contribution-sidepanel/_features/linked-issues/linked-issues";
import { Timeline } from "@/shared/panels/contribution-sidepanel/_features/timeline/timeline";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

import { ApplicationsAccordion } from "./_features/applications-accordion/applications-accordion";
import { Header } from "./_features/header/header";
import { Kpi } from "./_features/kpi/kpi";

export function ContributionsSidepanel() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { name } = useContributionsSidepanel();
  const { Panel, isOpen } = useSidePanel({ name });
  const { id } = useSinglePanelData<ContributionsPanelData>(name) ?? {
    id: "",
  };

  const { data: projectData } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: {
      slug: projectSlug,
    },
    options: {
      // enabled: !!projectSlug,
      enabled: false,
    },
  });

  const { data: pixelfactProfileData } = UserReactQueryAdapter.client.useGetUserByLogin({
    pathParams: { slug: "pixelfact" },
  });

  const { data: applicationsActiveData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId: projectData?.id,
      isApplicantProjectMember: true,
    },
    options: {
      // enabled: !!projectData?.id,
      enabled: false,
    },
  });

  const { data: applicationsNewData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId: projectData?.id,
      isApplicantProjectMember: false,
    },
    options: {
      // enabled: !!projectData?.id,
      enabled: false,
    },
  });

  const { data: applicationsIgnoredData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId: projectData?.id,
      isIgnored: true,
    },
    options: {
      // enabled: !!projectData?.id,
      enabled: false,
    },
  });

  const applicantsActiveNumber = applicationsActiveData?.pages[0].totalItemNumber ?? 0;
  const applicantsNewNumber = applicationsNewData?.pages[0].totalItemNumber ?? 0;
  const applicantsIgnoredNumber = applicationsIgnoredData?.pages[0].totalItemNumber ?? 0;

  const activeApplicants = applicationsActiveData?.pages.flatMap(page => page.applications) || [];
  const newApplicants = applicationsNewData?.pages.flatMap(page => page.applications) || [];
  const ignoredApplicants = applicationsIgnoredData?.pages.flatMap(page => page.applications) || [];

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionId: id },
    options: {
      enabled: isOpen && !!id,
    },
  });

  return (
    <>
      <Panel>
        <Header />
        <SidePanelBody>
          {id}
          <Timeline id={id} />
          <LinkedIssues issues={contribution?.linkedIssues} id={id} />
          <Kpi
            applicants={applicantsActiveNumber + applicantsNewNumber + applicantsIgnoredNumber}
            projectContributors={applicantsActiveNumber}
            newContributors={applicantsNewNumber}
          />
          <ApplicationsAccordion
            activeApplicants={activeApplicants}
            newApplicants={newApplicants}
            ignoredApplicants={ignoredApplicants}
          />
          <div>
            {pixelfactProfileData ? (
              <ProfileCard
                headerProps={{
                  headerLabel: { children: "Assigned" },
                  badgeProps: { children: "2 days ago", color: "success" },
                }}
                user={pixelfactProfileData}
                footerContent={
                  <Button variant={"secondary"} classNames={{ base: "w-full" }}>
                    Remove contributor
                  </Button>
                }
              />
            ) : null}
          </div>
        </SidePanelBody>
      </Panel>
      <IssuesSearchSidepanel />
    </>
  );
}
