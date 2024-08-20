"use client";

import { useMemo, useState } from "react";

import { BudgetAvailableCards } from "@/app/programs/[programId]/_features/budget-available-cards/budget-available-cards";
import { FinancialColumnChart } from "@/app/programs/[programId]/_features/financial-column-chart/financial-column-chart";
import { GrantListSidepanel } from "@/app/programs/[programId]/_features/grant-list-sidepanel/grant-list-sidepanel";
import { ProjectsTable } from "@/app/programs/[programId]/_features/projects-table/projects-table";
import { TransactionsTrigger } from "@/app/programs/[programId]/_features/transactions-trigger/transactions-trigger";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ProjectSidePanelProvider } from "@/shared/features/panels/project-sidepanel/project-sidepanel.context";
import { Translate } from "@/shared/translation/components/translate/translate";

const BUDGET_AVAILABLE = "budgetAvailable";
const BUDGET_CHART = "budgetChart";

export default function ProgramPage({ params: { programId } }: { params: { programId: string } }) {
  const [toggleFinancialViews, setToggleFinancialViews] = useState<typeof BUDGET_AVAILABLE | typeof BUDGET_CHART>(
    BUDGET_AVAILABLE
  );
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
  });

  const renderFinancialView = useMemo(() => {
    if (toggleFinancialViews === BUDGET_AVAILABLE) {
      return <BudgetAvailableCards />;
    }

    return <FinancialColumnChart />;
  }, [toggleFinancialViews]);

  function handleToggleFinancialViews(view: typeof BUDGET_AVAILABLE | typeof BUDGET_CHART) {
    setToggleFinancialViews(view);
  }

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
      <ProjectSidePanelProvider>
        <AnimatedColumn className="flex h-full flex-1 flex-col gap-3 overflow-auto">
          <div className="h-auto">
            <PageContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <Typo size={"2xl"} variant={"brand"} translate={{ token: "programs:details.financial.title" }} />
                    <Paper size={"s"} container={"3"} border={"none"} classNames={{ base: "flex gap-2 w-fit p-1" }}>
                      <Button
                        variant="secondary-light"
                        startIcon={{ name: "ri-money-dollar-circle-line" }}
                        translate={{ token: "programs:details.financial.buttons.budgetAvailable" }}
                        onClick={() => handleToggleFinancialViews(BUDGET_AVAILABLE)}
                        isDisabled={toggleFinancialViews === BUDGET_AVAILABLE}
                      />
                      <Button
                        variant="secondary-light"
                        startIcon={{ name: "ri-bar-chart-2-line" }}
                        translate={{ token: "programs:details.financial.buttons.budgetChart" }}
                        onClick={() => handleToggleFinancialViews(BUDGET_CHART)}
                        isDisabled={toggleFinancialViews === BUDGET_CHART}
                      />
                    </Paper>
                  </div>
                  <TransactionsTrigger programId={programId} />
                </div>

                {renderFinancialView}
              </div>
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
            </div>
          </PageContent>
        </AnimatedColumn>
      </ProjectSidePanelProvider>
    </PageWrapper>
  );
}
