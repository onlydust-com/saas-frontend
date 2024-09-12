"use client";

import { ChevronRight } from "lucide-react";

import { GrantFormSidepanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";
import { useGrantListSidePanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel.hooks";
import { ProjectsTable } from "@/app/programs/[programId]/_features/projects-table/projects-table";
import { FinancialSection } from "@/app/programs/[programId]/_sections/financial-section/financial-section";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

export function SafeProgramPage({ params: { programId } }: { params: { programId: string } }) {
  const { isOpen: isGrantListOpen, open: openGrantList, close: CloseGrantList } = useGrantListSidePanel();

  function toggleGrantListPanel() {
    (isGrantListOpen ? CloseGrantList : openGrantList)();
  }

  return (
    <>
      <PosthogCaptureOnMount eventName={"program_viewed"} />
      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
        <div className="h-auto">
          <PageContent>
            <FinancialSection />
          </PageContent>
        </div>
        <PageContent>
          <div className="grid gap-3">
            <header className={"flex items-center justify-between"}>
              <Typo
                variant={"heading"}
                size={"xs"}
                weight={"medium"}
                translate={{
                  token: "programs:details.projects.title",
                }}
              />

              <Button
                variant={"primary"}
                endIcon={{ component: ChevronRight }}
                isTextButton
                size={"md"}
                onClick={toggleGrantListPanel}
              >
                <Translate token={"programs:details.projects.grantProject"} />
              </Button>
            </header>

            <ProjectsTable programId={programId} />
            <GrantFormSidepanel />
          </div>
        </PageContent>
      </AnimatedColumn>
      <ProjectSidepanel />
      <GrantListSidepanel />
      <GrantFormSidepanel />
    </>
  );
}

export default function ProgramPage({ params: { programId } }: { params: { programId: string } }) {
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
      <SafeProgramPage params={{ programId }} />
    </PageWrapper>
  );
}
