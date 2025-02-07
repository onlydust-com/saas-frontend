"use client";

import { ReactNode, useMemo } from "react";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

import { EcosystemDocumentation } from "./_features/ecosystem-documentation/ecosystem-documentation";
import { EcosystemEvents } from "./_features/ecosystem-events/ecosystem-events";
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
      classNames={{ base: "w-full pl-xl" }}
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
    <PageContainer size="medium" className={"flex-1"}>
      <div className="flex flex-col items-start justify-start gap-4 pt-4 laptop:h-full laptop:flex-row">
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
          <EcosystemSummary ecosystemSlug={params.ecosystemSlug} />
          <EcosystemEvents ecosystemSlug={params.ecosystemSlug} />
          <EcosystemDocumentation ecosystemSlug={params.ecosystemSlug} />
        </div>

        <Paper
          background="primary"
          border="primary"
          classNames={{ base: "desktop:col-span-2 overflow-hidden tablet:h-full flex flex-col pb-xl" }}
          px="none"
        >
          <div className={"flex h-12 w-full flex-row items-end justify-between gap-1 laptop:h-[65px]"}>
            <Navigation params={params} />
          </div>
          {children}
        </Paper>
      </div>
    </PageContainer>
  );
}
