"use client";

import { PropsWithChildren, useMemo } from "react";

import { HackathonEvents } from "@/app/(saas)/hackathons/[hackathonSlug]/_features/hackathon-events/hackathon-events";
import { HackathonSummary } from "@/app/(saas)/hackathons/[hackathonSlug]/_features/hackathon-summary/hackathon-summary";
import { RegisterHackathon } from "@/app/(saas)/hackathons/_features/register-hackathon/register-hackathon";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { IsAuthenticated, SignInButton } from "@/shared/providers/auth-provider";
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
    <PageContainer size="medium" className={"flex-1"}>
      <div className="flex flex-col items-start justify-start gap-4 py-4 laptop:h-full laptop:flex-row">
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
          <HackathonSummary hackathonSlug={params.hackathonSlug} />
          <HackathonEvents hackathonSlug={params.hackathonSlug} />
        </div>

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
              <IsAuthenticated>
                <IsAuthenticated.Yes>
                  <RegisterHackathon hackathonSlug={params.hackathonSlug} />
                </IsAuthenticated.Yes>
                <IsAuthenticated.No>
                  <SignInButton>Registered</SignInButton>
                </IsAuthenticated.No>
              </IsAuthenticated>
            </div>
          </div>

          {children}
        </Paper>
      </div>
    </PageContainer>
  );
}
