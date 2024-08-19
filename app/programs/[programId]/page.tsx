"use client";

import { useMemo, useState } from "react";

import { FinancialColumnChart } from "@/app/programs/[programId]/_features/financial-column-chart/financial-column-chart";
import { ProjectSidepanel } from "@/app/programs/[programId]/_features/project-sidepanel/project-sidepanel";
import { TransactionsTrigger } from "@/app/programs/[programId]/_features/transactions-trigger/transactions-trigger";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

const BUDGET_AVAILABLE = "budgetAvailable";
const BUDGET_CHART = "budgetChart";

function ProjectButtonMock() {
  const { Panel, open, close, isOpen } = useSidePanel({ name: "project-detail" });
  function togglePanel() {
    if (!isOpen) {
      open();
    } else {
      close();
    }
  }

  return (
    <>
      <Button onClick={togglePanel}>Open project</Button>
      <Panel>
        <ProjectSidepanel />
      </Panel>
    </>
  );
}

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
    if (toggleFinancialViews === BUDGET_CHART) {
      return <FinancialColumnChart />;
    }

    // TODO @Mehdi - Implement the cards view
    return <div>cards</div>;
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
      <AnimatedColumn className="h-full flex-1 overflow-auto">
        <div className="h-auto">
          <Paper size={"s"} container={"2"} border={"none"} classNames={{ base: "flex flex-col gap-4" }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-start gap-2">
                <Typo size={"2xl"} variant={"brand"} translate={{ token: "programs:details.financial.title" }} />
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
              </div>
              <TransactionsTrigger programId={programId} />
            </div>

            {renderFinancialView}
          </Paper>
          <h1>Content of Program Page : {data?.name}</h1>
          <FinancialColumnChart />
          <ProjectButtonMock />
        </div>
      </AnimatedColumn>
    </PageWrapper>
  );
}
