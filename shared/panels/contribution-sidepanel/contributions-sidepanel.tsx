import { useParams } from "next/navigation";
import { useState } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

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
import { Helper } from "./_features/helper/helper";
import { Kpi } from "./_features/kpi/kpi";

export function ContributionsSidepanel() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const [openHelper, setOpenHelper] = useState(false);

  const { name } = useContributionsSidepanel();
  const { Panel, isOpen } = useSidePanel({ name });
  const { id } = useSinglePanelData<ContributionsPanelData>(name) ?? {
    id: "",
  };

  function handleCloseHelper() {
    setOpenHelper(false);
  }

  function handleToggleHelper() {
    setOpenHelper(!openHelper);
  }

  const { data: projectData } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: {
      slug: projectSlug,
    },
    options: {
      enabled: isOpen && !!projectSlug,
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
      enabled: isOpen && !!projectData?.id,
    },
  });

  const { data: applicationsNewData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId: projectData?.id,
      isApplicantProjectMember: false,
    },
    options: {
      enabled: isOpen && !!projectData?.id,
    },
  });

  const { data: applicationsIgnoredData } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId: projectData?.id,
      isIgnored: true,
    },
    options: {
      enabled: isOpen && !!projectData?.id,
    },
  });

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionId: id },
    options: {
      enabled: isOpen && !!id,
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
      <Panel>
        <Header contribution={contribution} onToggleHelper={handleToggleHelper} />

        <SidePanelBody>
          {(contribution?.activityStatus === ContributionActivityStatus.NOT_ASSIGNED ||
            contribution?.activityStatus === ContributionActivityStatus.TO_REVIEW) &&
          openHelper ? (
            <Helper type={contribution?.activityStatus} onClose={handleCloseHelper} />
          ) : null}

          <Timeline id={id} />
          <LinkedIssues issues={contribution?.linkedIssues} id={id} />
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
