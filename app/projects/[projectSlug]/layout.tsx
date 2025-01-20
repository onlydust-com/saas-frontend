"use client";

import { ReactNode, useMemo } from "react";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { ApplyIssueSidepanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectOverviewSummary } from "../_features/project-details/project-overview-summary/project-overview-summary";
import { SimilarProjects } from "../_features/project-details/similar-projects/similar-projects";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "OPEN_ISSUES" = "OPEN_ISSUES",
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "REWARDS" = "REWARDS",
}

function Navigation({ params }: { params: { projectSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.projects.details.overview.root(params.projectSlug));
  const isOpenIssues = useMatchPath(NEXT_ROUTER.projects.details.issues.root(params.projectSlug));
  const isContributors = useMatchPath(NEXT_ROUTER.projects.details.contributors.root(params.projectSlug));
  const isRewards = useMatchPath(NEXT_ROUTER.projects.details.rewards.root(params.projectSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isOpenIssues) {
      return Views.OPEN_ISSUES;
    }
    if (isContributors) {
      return Views.CONTRIBUTORS;
    }
    if (isRewards) {
      return Views.REWARDS;
    }
  }, [isOverview, isOpenIssues, isContributors, isRewards]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"project-view"}
      classNames={{ base: "w-full pt-8 px-4" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"project:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.details.overview.root(params.projectSlug),
          },
        },
        {
          id: Views.OPEN_ISSUES,
          children: <Translate token={"project:details.tabs.openIssues"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.details.issues.root(params.projectSlug),
          },
        },
        {
          id: Views.CONTRIBUTORS,
          children: <Translate token={"project:details.tabs.contributors"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.details.contributors.root(params.projectSlug),
          },
        },
        {
          id: Views.REWARDS,
          children: <Translate token={"project:details.tabs.rewards"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.projects.details.rewards.root(params.projectSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function ProjectsLayout({ params, children }: { params: { projectSlug: string }; children: ReactNode }) {
  return (
    <GithubPermissionsProvider projectSlug={params.projectSlug}>
      <PageWrapper>
        <ScrollView>
          <AnimatedColumn className="h-full max-w-full">
            <div className="flex flex-col items-start justify-start gap-md laptop:h-full laptop:flex-row laptop:gap-lg">
              <ScrollView className="flex w-full flex-col gap-lg laptop:w-[440px] laptop:min-w-[440px]">
                <ProjectOverviewSummary projectIdOrSlug={params.projectSlug} />
                <SimilarProjects projectIdOrSlug={params.projectSlug} />
              </ScrollView>

              <Paper
                background="primary"
                border="primary"
                classNames={{ base: "w-full overflow-hidden h-full flex flex-col" }}
                px="none"
              >
                <div className={"flex w-full flex-row items-center justify-between gap-1"}>
                  <Navigation params={params} />
                </div>
                {children}
              </Paper>
            </div>
          </AnimatedColumn>

          <ApplyIssueSidepanel />
        </ScrollView>
      </PageWrapper>
    </GithubPermissionsProvider>
  );
}
