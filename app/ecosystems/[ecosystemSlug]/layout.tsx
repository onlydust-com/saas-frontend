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

import { Documentation } from "./_features/documentation/documentation";
import { EcosystemSummary } from "./_features/ecosystem-summary/ecosystem-summary";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "COMMUNITY" = "COMMUNITY",
}

function Navigation({ params }: { params: { ecosystemSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.ecosystems.details.overview.root(params.ecosystemSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.ecosystems.details.projects.root(params.ecosystemSlug));
  const isCommunity = useMatchPath(NEXT_ROUTER.ecosystems.details.community.root(params.ecosystemSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
    if (isCommunity) {
      return Views.COMMUNITY;
    }
  }, [isOverview, isProjects, isCommunity]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"ecosystem-view"}
      classNames={{ base: "w-full" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"ecosystems:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.ecosystems.details.overview.root(params.ecosystemSlug),
          },
        },
        {
          id: Views.PROJECTS,
          children: <Translate token={"ecosystems:details.tabs.projects"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.ecosystems.details.projects.root(params.ecosystemSlug),
          },
        },
        {
          id: Views.COMMUNITY,
          children: <Translate token={"ecosystems:details.tabs.community"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.ecosystems.details.community.root(params.ecosystemSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function EcosystemLayout({
  params,
  children,
}: {
  params: { ecosystemSlug: string };
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <AnimatedColumn className="h-full max-w-full">
        <div className="grid-col-1 grid h-full gap-lg tablet:grid-cols-1 desktop:grid-cols-3">
          <div className="flex flex-col gap-lg desktop:col-span-1">
            <EcosystemSummary ecosystemSlug={params.ecosystemSlug} />
            <Documentation ecosystemSlug={params.ecosystemSlug} />
          </div>
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
