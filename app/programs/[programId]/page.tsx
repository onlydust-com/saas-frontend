"use client";

import { useContext } from "react";

import {
  ProgramDetailsPanelContext,
  ProgramDetailsPanelProvider,
} from "@/app/programs/[programId]/_context/program-details-panels/program-details-panels.context";
import { FinancialColumnChart } from "@/app/programs/[programId]/_features/financial-column-chart/financial-column-chart";
import { TransactionsSidepanel } from "@/app/programs/[programId]/_features/transactions-sidepanel/transactions-sidepanel";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

function TransactionButtonMock() {
  const { transactionPanel } = useContext(ProgramDetailsPanelContext);

  function togglePanel() {
    const isPanelOpen = transactionPanel.current?.isPanelOpen();
    if (isPanelOpen) {
      transactionPanel.current?.closePanel();
    } else {
      transactionPanel.current?.openPanel();
    }
  }
  return <Button onClick={togglePanel}>Open Transactions</Button>;
}

export default function ProgramPage({ params: { programId } }: { params: { programId: string } }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
  });

  return (
    <ProgramDetailsPanelProvider>
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
        <AnimatedColumnGroup>
          <AnimatedColumn className="h-full flex-1 overflow-auto bg-container-2">
            <div className="h-auto">
              <h1>Content of Program Page : {data?.name}</h1>
              <FinancialColumnChart />
              <TransactionButtonMock />
            </div>
          </AnimatedColumn>
          <TransactionsSidepanel />
        </AnimatedColumnGroup>
      </PageWrapper>
    </ProgramDetailsPanelProvider>
  );
}
