"use client";

import { ReactNode, useMemo } from "react";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "ANALYTICS" = "ANALYTICS",
}

function Navigation({ params }: { params: { userSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.users.details.overview.root(params.userSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.users.details.projects.root(params.userSlug));
  const isAnalytics = useMatchPath(NEXT_ROUTER.users.details.analytics.root(params.userSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
    if (isAnalytics) {
      return Views.ANALYTICS;
    }
  }, [isOverview, isProjects, isAnalytics]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"user-view"}
      classNames={{ base: "w-full" }}
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
        {
          id: Views.ANALYTICS,
          children: <Translate token={"users:details.tabs.analytics"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.users.details.analytics.root(params.userSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function UsersLayout({ params, children }: { params: { userSlug: string }; children: ReactNode }) {
  return (
    <PageWrapper containerSize="small">
      <AnimatedColumn className="h-full max-w-full">
        <div className="grid-col-1 grid h-full gap-lg tablet:grid-cols-1 desktop:grid-cols-3">
          <div className="flex flex-col gap-lg desktop:col-span-1">{/* User summary component will go here */}</div>
          <Paper
            background="glass"
            border="primary"
            classNames={{ base: "desktop:col-span-2 overflow-hidden h-full flex flex-col" }}
            px="none"
          >
            <div className={"flex w-full flex-row items-center justify-between gap-1"}>
              <Navigation params={params} />
            </div>
            {children}
          </Paper>
        </div>
      </AnimatedColumn>
    </PageWrapper>
  );
}
