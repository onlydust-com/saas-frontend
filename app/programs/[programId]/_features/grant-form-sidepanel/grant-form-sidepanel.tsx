import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AmountSelector } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/amount-selector/amount-selector";
import { Summary } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/summary/summary";
import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { toast } from "@/design-system/atoms/toaster";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantFormSidepanel() {
  const { programId } = useParams<{ programId: string }>();
  const { sidePanel, projectState } = useGrantFormContext();
  const { Panel } = sidePanel;
  const [project] = projectState;
  const amountSelectorPortalRef = useRef(null);
  const [selectedBudget, setSelectedBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  // TODO @hayden handle NaN and decimals
  const [amount, setAmount] = useState(0);

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: projectUsdAmount, code: projectUsdCode } = moneyKernelPort.format({
    amount: project?.totalAvailable.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  const { data, isLoading, isError } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId) && Boolean(project),
    },
  });

  useEffect(() => {
    if (data) {
      // Set default selected budget
      setSelectedBudget(data.totalAvailable.totalPerCurrency?.[0]);
    }
  }, [data]);

  const { mutate } = ProgramReactQueryAdapter.client.useGrantBudgetToProject({
    options: {
      onSuccess: () => {
        toast.success(
          <Translate
            token={"programs:grantForm.success.toast"}
            values={{
              project: project?.name,
              amount,
              code: selectedBudget?.currency.code,
            }}
          />
        );
      },
      onError: () => {
        toast.error(<Translate token={"programs:grantForm.error.toast"} />);
      },
    },
  });

  function handleAmountChange(amount: number) {
    setAmount(amount);
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency) {
    setSelectedBudget(budget);
  }

  function handleGrantProject() {
    const projectId = project?.id;
    const currencyId = selectedBudget?.currency.id;

    if (!projectId || !currencyId) return;

    // TODO @hayden validate balance is not negative

    mutate({
      projectId,
      amount,
      currencyId,
    });
  }

  // TODO @hayden
  if (isLoading) return "LOADING";

  // TODO @hayden
  if (isError) return "ERROR";

  if (!data || !project || !selectedBudget || !data.totalAvailable.totalPerCurrency) return null;

  return (
    <Panel>
      <SidePanelHeader canClose={true} canGoBack title={{ token: "programs:grantForm.title" }} />

      <div ref={amountSelectorPortalRef} className={"h-full"}>
        <ScrollView>
          <div className="flex h-full flex-col gap-3">
            <CardProject
              title={project.name}
              description={project.description}
              logoUrl={project.logoUrl}
              buttonProps={{
                children: `${projectUsdAmount} ${projectUsdCode}`,
                classNames: {
                  base: "pointer-events-none whitespace-nowrap",
                },
              }}
            />

            <div className="flex max-h-72 flex-1 items-center">
              <AmountSelector
                portalRef={amountSelectorPortalRef}
                amount={amount}
                onAmountChange={handleAmountChange}
                budget={selectedBudget}
                allBudgets={data.totalAvailable.totalPerCurrency}
                onBudgetChange={handleBudgetChange}
              />
            </div>

            <Summary amount={amount} budget={selectedBudget} project={project} />
          </div>
        </ScrollView>
      </div>

      <SidePanelFooter>
        <Button size={"l"} classNames={{ base: "w-full" }} onClick={handleGrantProject}>
          <Translate token={"programs:grantForm.submit"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
