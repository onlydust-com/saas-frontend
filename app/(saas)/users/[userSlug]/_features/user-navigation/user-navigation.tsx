"use client";

import { useMemo } from "react";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  // "ANALYTICS" = "ANALYTICS",
}

export function UserNavigation({ params }: { params: { userSlug: string } }) {
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
