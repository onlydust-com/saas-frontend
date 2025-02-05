"use client";

import { ReactNode, useMemo } from "react";

import { GlobalDataFilter } from "@/app/(saas)/data/_features/global-data-filter/global-data-filter";
import {
  GlobalDataFilterProvider,
  useGlobalDataFilter,
} from "@/app/(saas)/data/_features/global-data-filter/global-data-filter.context";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "CONTRIBUTORS" = "CONTRIBUTORS",
}

function Navigation() {
  const { params } = useGlobalDataFilter();
  const isOverview = useMatchPath(NEXT_ROUTER.data.overview.root);
  const isContributors = useMatchPath(NEXT_ROUTER.data.contributors.root);
  const isProjects = useMatchPath(NEXT_ROUTER.data.projects.root);

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isContributors) {
      return Views.CONTRIBUTORS;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
  }, [isOverview, isContributors, isProjects]);

  function addSearchParamsToUrl(url: string) {
    return `${url}?${params}`;
  }

  return (
    <Tabs
      variant={"solid"}
      searchParams={"data-view"}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: "Overview",
          as: BaseLink,
          htmlProps: {
            href: addSearchParamsToUrl(NEXT_ROUTER.data.overview.root),
          },
        },
        {
          id: Views.PROJECTS,
          children: "Projects",
          as: BaseLink,
          htmlProps: {
            href: addSearchParamsToUrl(NEXT_ROUTER.data.projects.root),
          },
        },
        {
          id: Views.CONTRIBUTORS,
          children: "Contributors",
          as: BaseLink,
          htmlProps: {
            href: addSearchParamsToUrl(NEXT_ROUTER.data.contributors.root),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

function DataLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer size="large" className="flex-1">
      <GlobalDataFilterProvider>
        <PageContent classNames={{ base: "flex flex-col gap-3 h-full overflow-hidden" }}>
          <div className={"flex w-full flex-row items-center justify-between gap-1"}>
            <Navigation />
            <GlobalDataFilter />
          </div>
          {children}
        </PageContent>
        <ContributorSidepanel />
        <ProjectSidepanel />
      </GlobalDataFilterProvider>
    </PageContainer>
  );
}

export default withClientOnly(DataLayout);
