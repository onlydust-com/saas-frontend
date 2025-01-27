"use client";

import { PropsWithChildren, useMemo } from "react";

import { HackathonEvents } from "@/app/(saas)/hackathons/[hackathonSlug]/_features/hackathon-events/hackathon-events";
import { HackathonSummary } from "@/app/(saas)/hackathons/[hackathonSlug]/_features/hackathon-summary/hackathon-summary";
import { RegisterHackathon } from "@/app/(saas)/hackathons/_features/register-hackathon/register-hackathon";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "COMMUNITY" = "COMMUNITY",
}

function Navigation({ params }: { params: { hackathonSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.hackathons.details.overview.root(params.hackathonSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.hackathons.details.projects.root(params.hackathonSlug));
  const isCommunity = useMatchPath(NEXT_ROUTER.hackathons.details.community.root(params.hackathonSlug));

  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
    // if (isCommunity) {
    //   return Views.COMMUNITY;
    // }
  }, [isOverview, isProjects, isCommunity]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"hackathon-view"}
      classNames={{ base: "tablet:self-end self-start -mb-px pl-xl" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"hackathon:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.hackathons.details.overview.root(params.hackathonSlug),
          },
        },
        {
          id: Views.PROJECTS,
          children: <Translate token={"hackathon:details.tabs.projects"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.hackathons.details.projects.root(params.hackathonSlug),
          },
        },
        // {
        //   id: Views.COMMUNITY,
        //   children: <Translate token={"hackathon:details.tabs.community"} />,
        //   as: BaseLink,
        //   htmlProps: {
        //     href: NEXT_ROUTER.hackathons.details.community.root(params.hackathonSlug),
        //   },
        // },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function HackathonsLayout({
  params,
  children,
}: PropsWithChildren<{
  params: { hackathonSlug: string };
}>) {
  return (
    <PageWrapper containerSize="medium">
      <ScrollView>
        <AnimatedColumn className="h-full max-w-full">
          <div className="flex flex-col items-start justify-start gap-lg laptop:h-full laptop:flex-row">
            <ScrollView className="flex w-full flex-col gap-lg laptop:w-[440px] laptop:min-w-[440px]">
              <HackathonSummary hackathonSlug={params.hackathonSlug} />
              <HackathonEvents hackathonSlug={params.hackathonSlug} />
            </ScrollView>

            <Paper
              background="primary"
              border="primary"
              classNames={{ base: "desktop:col-span-2 overflow-hidden tablet:h-full flex flex-col pb-xl" }}
              size="none"
            >
              <div
                className={
                  "flex w-full flex-col-reverse items-center justify-between border-b border-border-primary tablet:flex-row"
                }
              >
                <Navigation params={params} />

                <div className={"w-full p-xl tablet:w-auto"}>
                  <RegisterHackathon hackathonSlug={params.hackathonSlug} />
                </div>
              </div>
              {children}
            </Paper>
          </div>
        </AnimatedColumn>
      </ScrollView>
    </PageWrapper>
  );
}
