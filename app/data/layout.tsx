"use client";

import { ReactNode, useMemo } from "react";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

enum tabs {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "CONTRIBUTORS" = "CONTRIBUTORS",
}

export default function DataLayout({ children }: { children: ReactNode }) {
  const isOverview = useMatchPath(NEXT_ROUTER.data.overview);
  const isContributors = useMatchPath(NEXT_ROUTER.data.contributors);
  const isProjects = useMatchPath(NEXT_ROUTER.data.projects);

  const selectedId = useMemo(() => {
    if (isOverview) {
      return tabs.OVERVIEW;
    }
    if (isContributors) {
      return tabs.CONTRIBUTORS;
    }
    if (isProjects) {
      return tabs.PROJECTS;
    }
  }, [isOverview, isContributors, isProjects]);

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"data:details.header.title"} />,
          },
        ],
      }}
    >
      <AnimatedColumn className="h-full">
        <ScrollView className="flex flex-col gap-md">
          <PageContent>
            <Tabs
              variant={"solid"}
              searchParams={"data-view"}
              tabs={[
                {
                  id: tabs.OVERVIEW,
                  children: <Translate token={"manageProjects:detail.activity.buttons.contributors"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.data.overview,
                  },
                },
                {
                  id: tabs.CONTRIBUTORS,
                  children: <Translate token={"manageProjects:detail.activity.buttons.contributions"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.data.projects,
                  },
                },
                {
                  id: tabs.PROJECTS,
                  children: <Translate token={"manageProjects:detail.activity.buttons.financial"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.data.contributors,
                  },
                },
              ]}
              selectedId={selectedId}
            />
            {children}
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
}
