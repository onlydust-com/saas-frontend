"use client";

import { PropsWithChildren } from "react";

import { GrantFormSidepanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel";
import {
  GrantFormContextProvider,
  useGrantFormContext,
} from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";
import { ProjectsTable } from "@/app/programs/[programId]/_features/projects-table/projects-table";
import { FinancialSection } from "@/app/programs/[programId]/_sections/financial-section/financial-section";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { AnyType } from "@/core/kernel/types";

import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ProjectSidePanelProvider } from "@/shared/panels/project-sidepanel/project-sidepanel.context";
import { Translate } from "@/shared/translation/components/translate/translate";

function WithProjectPanelProvider({ children }: PropsWithChildren) {
  const {
    sidePanel: { open: openGrantForm },
    projectState: [, setGrantProject],
  } = useGrantFormContext();

  function handleOpenProjectGrant(projectId: string) {
    setGrantProject({
      id: projectId,
      name: "",
      logoUrl: undefined,
      description: "",
      totalAvailable: {
        totalUsdEquivalent: 0,
        totalPerCurrency: [],
      },
    } as AnyType);
    openGrantForm();
  }

  return <ProjectSidePanelProvider onGrantClick={handleOpenProjectGrant}>{children}</ProjectSidePanelProvider>;
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
        iconName: "ri-clipboard-line",
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
      <GrantFormContextProvider>
        <WithProjectPanelProvider>
          <AnimatedColumn className="flex h-full flex-1 flex-col gap-3 overflow-auto">
            <div className="h-auto">
              <PageContent>
                <FinancialSection />
              </PageContent>
            </div>
            <PageContent>
              <div className="grid gap-3">
                <header className={"flex items-center justify-between"}>
                  <Typo
                    variant={"brand"}
                    size={"2xl"}
                    translate={{
                      token: "programs:details.projects.title",
                    }}
                    color={"text-1"}
                  />

                  <GrantListSidepanel />
                </header>

                <ProjectsTable programId={programId} />
                <GrantFormSidepanel />
              </div>
            </PageContent>
          </AnimatedColumn>
        </WithProjectPanelProvider>
      </GrantFormContextProvider>
    </PageWrapper>
  );
}
