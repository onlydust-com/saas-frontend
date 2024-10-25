"use client";

import { GrantButton } from "@/app/programs/[programId]/_features/grant-button/grant-button";
import { GrantFormSidepanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";
import { ProjectsTable } from "@/app/programs/[programId]/_features/projects-table/projects-table";
import { FinancialSection } from "@/app/programs/[programId]/_sections/financial-section/financial-section";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function SafeProgramPage({ params: { programId } }: { params: { programId: string } }) {
  return (
    <>
      <PosthogCaptureOnMount eventName={"program_viewed"} />

      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md">
        <PageContent classNames={{ base: "flex-none" }}>
          <FinancialSection />
        </PageContent>
        <PageContent classNames={{ base: "overflow-hidden" }}>
          <div className="flex h-full flex-col gap-3">
            <header className={"flex items-center justify-between"}>
              <Typo
                variant={"heading"}
                size={"xs"}
                weight={"medium"}
                translate={{
                  token: "programs:details.projects.title",
                }}
              />

              <GrantButton programId={programId} />
            </header>
            <ScrollView direction={"all"}>
              <ProjectsTable programId={programId} />
            </ScrollView>
          </div>
        </PageContent>
      </AnimatedColumn>

      <FinancialDetailSidepanel />
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
