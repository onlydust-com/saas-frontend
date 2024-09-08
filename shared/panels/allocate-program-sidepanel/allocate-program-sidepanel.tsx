import { Button } from "@/design-system/atoms/button/variants/button-default";
import { AccordionLoading } from "@/design-system/molecules/accordion";
import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Summary } from "@/shared/panels/allocate-program-sidepanel/_components/summary";
import { useAllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { AllocateProgramSidepanelProps } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function AllocateProgramSidepanel({ programId }: AllocateProgramSidepanelProps) {
  const { amount, budget, handleAmountChange, handleBudgetChange, program, summary } = useAllocateProgramSidepanel({
    programId,
  });

  function renderBody() {
    if (program.isLoading) {
      return (
        <div className="flex h-full flex-col gap-3">
          <CardProjectLoading />

          <AmountSelectorLoading />

          <AccordionLoading />
        </div>
      );
    }

    if (program.isError) {
      return <ErrorState />;
    }

    if (!program.data || !budget) return null;

    return (
      <div className="flex h-full flex-col gap-3">
        <CardProject
          title={program.data.name}
          logoUrl={program.data.logoUrl}
          buttonProps={{
            children: `${program.usdAmount} USD`,
            classNames: {
              base: "pointer-events-none whitespace-nowrap",
            },
          }}
        />

        <div className="flex max-h-72 flex-1 items-center">
          <AmountSelector
            amount={amount}
            onAmountChange={handleAmountChange}
            budget={budget}
            allBudgets={program.data.totalAvailable.totalPerCurrency}
            onBudgetChange={handleBudgetChange}
          />
        </div>

        <Summary summary={summary} />
      </div>
    );
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "panels:allocateProgram.title" },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>{renderBody()}</SidePanelBody>

      <SidePanelFooter>
        <Button variant={"secondary"} size={"md"}>
          <Translate token={"panels:allocateProgram.makeAllocation"} />
        </Button>
      </SidePanelFooter>
    </>
  );
}
