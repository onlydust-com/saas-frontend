"use client";

import { useMemo } from "react";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "OPEN_ISSUES" = "OPEN_ISSUES",
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "REWARDS" = "REWARDS",
}

export function ProjectNavigation({ params }: { params: { projectSlug: string } }) {
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
