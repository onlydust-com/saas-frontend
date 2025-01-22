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
  "README" = "README",
  "OPEN_ISSUES" = "OPEN_ISSUES",
}

function Navigation({ params }: { params: { repositorySlug: string } }) {
  const isReadme = useMatchPath(NEXT_ROUTER.repositories.details.readme.root(params.repositorySlug));
  const isOpenIssues = useMatchPath(NEXT_ROUTER.repositories.details.issues.root(params.repositorySlug));

  const selectedId = useMemo(() => {
    if (isReadme) {
      return Views.README;
    }
    if (isOpenIssues) {
      return Views.OPEN_ISSUES;
    }
  }, [isReadme, isOpenIssues]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"repository-view"}
      classNames={{ base: "w-full" }}
      tabs={[
        {
          id: Views.README,
          children: <Translate token={"repositories:details.tabs.readme"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.repositories.details.readme.root(params.repositorySlug),
          },
        },
        {
          id: Views.OPEN_ISSUES,
          children: <Translate token={"repositories:details.tabs.openIssues"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.repositories.details.issues.root(params.repositorySlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}

export default function RepositoriesLayout({
  params,
  children,
}: {
  params: { repositorySlug: string };
  children: ReactNode;
}) {
  return (
    <PageWrapper containerSize="small">
      <AnimatedColumn className="h-full max-w-full">
        <div className="grid-col-1 grid h-full gap-lg tablet:grid-cols-1 desktop:grid-cols-3">
          <div className="flex flex-col gap-lg desktop:col-span-1">left content</div>
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
