import { Button } from "@/design-system/atoms/button/variants/button-default";
import { AccordionLoading } from "@/design-system/molecules/accordion";
import { CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { CardProgram } from "@/shared/panels/_flows/ungrant-flow/_components/card-program/card-program";
import { Summary } from "@/shared/panels/_flows/ungrant-flow/_panels/amount-selection/_components/summary";
import {
  useAmountSelection,
  useUngrantProgram,
} from "@/shared/panels/_flows/ungrant-flow/_panels/amount-selection/amount-selection.hooks";
import { useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";

export function AmountSelection() {
  const { name } = useAmountSelection();
  const { Panel } = useSidePanel({ name });
  const { program } = useUngrantFlow();

  const { amount, budget, allBudgets, handleAmountChange, handleBudgetChange, isLoading, isError, summary, ungrant } =
    useUngrantProgram();

  function renderBody() {
    if (isLoading) {
      return (
        <div className="flex h-full flex-col gap-3">
          <CardProjectLoading />

          <AmountSelectorLoading />

          <AccordionLoading />
        </div>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!program || !budget) return null;

    return (
      <div className="flex h-full flex-col gap-3">
        <CardProgram program={program} />

        <div className="flex items-center">
          <AmountSelector
            amount={amount}
            onAmountChange={handleAmountChange}
            budget={budget}
            allBudgets={allBudgets}
            onBudgetChange={handleBudgetChange}
            actions={[
              {
                value: 25,
                label: "25 %",
                type: "PERCENT",
              },
              {
                value: 50,
                label: "50 %",
                type: "PERCENT",
              },
              {
                value: 75,
                label: "75 %",
                type: "PERCENT",
              },
              {
                value: 100,
                label: "100 %",
                type: "PERCENT",
              },
            ]}
          />
        </div>

        <Summary summary={summary} />
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:ungrantAmountSelection.title",
          },
        }}
        canClose
        canGoBack
      />

      <SidePanelBody>{renderBody()}</SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          onClick={() => ungrant.post()}
          isLoading={ungrant.isPending}
          isDisabled={isLoading || ungrant.newBalanceIsNegative}
          translate={{ token: "panels:ungrantAmountSelection.ungrant" }}
        />
      </SidePanelFooter>
    </Panel>
  );
}
