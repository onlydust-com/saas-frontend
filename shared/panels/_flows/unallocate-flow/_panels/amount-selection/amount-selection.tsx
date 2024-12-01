import { Button } from "@/design-system/atoms/button/variants/button-default";
import { AccordionLoading } from "@/design-system/molecules/accordion";
import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Summary } from "@/shared/panels/_flows/unallocate-flow/_panels/amount-selection/_components/summary";
import {
  useAmountSelection,
  useUnallocateProgram,
} from "@/shared/panels/_flows/unallocate-flow/_panels/amount-selection/amount-selection.hooks";
import { useUnallocateFlow } from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function AmountSelection() {
  const { sponsor } = useUnallocateFlow();

  const { name } = useAmountSelection();
  const { Panel } = useSidePanel({ name });

  const {
    amount,
    budget,
    allBudgets,
    handleAmountChange,
    handleBudgetChange,
    isLoading,
    isError,
    summary,
    unallocate,
  } = useUnallocateProgram();

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

    if (!sponsor || !budget) return null;

    return (
      <div className="flex h-full flex-col gap-3">
        <CardProject
          title={sponsor.name}
          logoUrl={sponsor.logoUrl}
          // TODO @hayden
          // buttonProps={{
          //   children: `${sponsorUsdAmount} USD`,
          // }}
        />

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
          variant={"secondary"}
          size={"md"}
          onClick={() => unallocate.post()}
          isDisabled={isLoading || unallocate.isPending || unallocate.newBalanceIsNegative}
        >
          <Translate token={"panels:unallocateAmountSelection.unallocate"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
