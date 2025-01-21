import { Button } from "@/design-system/atoms/button/variants/button-default";

import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { CardSponsor } from "@/shared/panels/_flows/unallocate-flow/_components/card-sponsor/card-sponsor";
import { Summary } from "@/shared/panels/_flows/unallocate-flow/_panels/amount-selection/_components/summary";
import {
  useAmountSelection,
  useUnallocateProgram,
} from "@/shared/panels/_flows/unallocate-flow/_panels/amount-selection/amount-selection.hooks";
import { useUnallocateFlow } from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.context";

export function AmountSelection() {
  const { name } = useAmountSelection();
  const { Panel } = useSidePanel({ name });
  const { sponsor } = useUnallocateFlow();

  const { amount, budget, allBudgets, handleAmountChange, handleBudgetChange, summary, unallocate } =
    useUnallocateProgram();

  function renderBody() {
    if (!sponsor || !budget) return null;

    return (
      <div className="flex h-full flex-col gap-3">
        <CardSponsor sponsor={sponsor} />

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
            token: "panels:unallocateAmountSelection.title",
          },
        }}
        canClose
        canGoBack
      />

      <SidePanelBody>{renderBody()}</SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"primary"}
          size={"md"}
          onClick={() => unallocate.post()}
          isLoading={unallocate.isPending}
          isDisabled={unallocate.newBalanceIsNegative}
          translate={{ token: "panels:unallocateAmountSelection.unallocate" }}
        />
      </SidePanelFooter>
    </Panel>
  );
}
