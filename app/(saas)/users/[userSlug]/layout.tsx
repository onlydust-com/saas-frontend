"use client";

import { ReactNode, useMemo } from "react";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

import { UserSummary } from "./_features/user-summary/user-summary";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  // "ANALYTICS" = "ANALYTICS",
}

function Navigation({ params }: { params: { userSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.users.details.overview.root(params.userSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.users.details.projects.root(params.userSlug));
  // const isAnalytics = useMatchPath(NEXT_ROUTER.users.details.analytics.root(params.userSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
    // if (isAnalytics) {
    //   return Views.ANALYTICS;
    // }
  }, [isOverview, isProjects]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"user-view"}
      classNames={{ base: "w-full pl-xl" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"users:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.users.details.overview.root(params.userSlug),
          },
        },
        {
          id: Views.PROJECTS,
          children: <Translate token={"users:details.tabs.projects"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.users.details.projects.root(params.userSlug),
          },
        },
        // {
        //   id: Views.ANALYTICS,
        //   children: <Translate token={"users:details.tabs.analytics"} />,
        //   as: BaseLink,
        //   htmlProps: {
        //     href: NEXT_ROUTER.users.details.analytics.root(params.userSlug),
        //   },
        // },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function UsersLayout({ params, children }: { params: { userSlug: string }; children: ReactNode }) {
  return (
    <PageContainer size="medium" className="flex-1">
      <div className="flex flex-col items-start justify-start gap-4 py-4 laptop:h-full laptop:flex-row">
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
          <UserSummary userSlug={params.userSlug} />
        </div>

        <Paper
          background="primary"
          border="primary"
          classNames={{ base: "overflow-hidden h-full flex flex-col" }}
          size="none"
        >
          <div className={"flex h-12 w-full items-end laptop:h-[86px]"}>
            <Navigation params={params} />
          </div>

          {children}
        </Paper>
      </div>
    </PageContainer>
  );
}
