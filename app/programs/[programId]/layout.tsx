"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PropsWithChildren, useMemo } from "react";

import { GrantButton } from "@/app/programs/[programId]/_features/grant-button/grant-button";
import { GrantFormSidepanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "PROJECTS" = "PROJECTS",
  "FINANCIAL" = "FINANCIAL",
}

function ProgramsLayout({ children, params: { programId } }: PropsWithChildren<{ params: { programId: string } }>) {
  const isProjects = useMatchPath(NEXT_ROUTER.programs.projects.root(programId));
  const isFinancial = useMatchPath(NEXT_ROUTER.programs.financial.root(programId));

  const selectedId = useMemo(() => {
    if (isProjects) {
      return Views.PROJECTS;
    }
    if (isFinancial) {
      return Views.FINANCIAL;
    }
  }, [isProjects, isFinancial]);

  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
  });

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
            href: NEXT_ROUTER.programs.root,
          },
          {
            id: "details",
            label: data?.name,
          },
        ],
      }}
    >
      <PosthogCaptureOnMount eventName={"program_viewed"} />

      <AnimatedColumn className="h-full">
        <ScrollView className={"flex flex-col"}>
          <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
            <div className="flex h-full flex-col gap-lg">
              <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
                <Tabs
                  variant={"solid"}
                  searchParams={"data-view"}
                  tabs={[
                    {
                      id: Views.PROJECTS,
                      children: <Translate token={"programs:details.views.projects"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.programs.projects.root(programId),
                      },
                    },
                    {
                      id: Views.FINANCIAL,
                      children: <Translate token={"programs:details.views.financial"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.programs.financial.root(programId),
                      },
                    },
                  ]}
                  selectedId={selectedId}
                />

                <div className="flex items-center gap-lg">
                  <GrantButton programId={programId} />
                </div>
              </header>

              {children}
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <GrantListSidepanel />
      <GrantFormSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ProgramsLayout));
