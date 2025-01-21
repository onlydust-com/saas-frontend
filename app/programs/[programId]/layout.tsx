"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PropsWithChildren, useCallback, useMemo } from "react";

import { GrantButton } from "@/app/programs/[programId]/_features/grant-button/grant-button";
import { GrantFormSidepanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import {
  UnallocateFlowProvider,
  useUnallocateFlow,
} from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.context";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "PROJECTS" = "PROJECTS",
  "FINANCIAL" = "FINANCIAL",
}

function Safe({ children, programId }: PropsWithChildren<{ programId: string }>) {
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

  const { open: openUnallocateFlow } = useUnallocateFlow();

  function renderUnallocateButton() {
    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        translate={{ token: "programs:details.actions.returnFunds" }}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
        onClick={openUnallocateFlow}
      />
    );
  }

  const renderActions = useCallback(() => {
    return (
      <div className="flex items-center gap-lg">
        {isFinancial ? renderUnallocateButton() : null}

        <GrantButton programId={programId} />
      </div>
    );
  }, [isProjects, isFinancial]);

  return (
    <>
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

                {renderActions()}
              </header>

              {children}
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <FinancialDetailSidepanel footer={renderUnallocateButton()} />
    </>
  );
}

function ProgramsLayout({ children, params: { programId } }: PropsWithChildren<{ params: { programId: string } }>) {
  return (
    <PageWrapper containerSize="medium">
      <PosthogCaptureOnMount eventName={"program_viewed"} />

      <UnallocateFlowProvider programId={programId}>
        <Safe programId={programId}>{children}</Safe>
      </UnallocateFlowProvider>

      <GrantListSidepanel />
      <GrantFormSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ProgramsLayout));
