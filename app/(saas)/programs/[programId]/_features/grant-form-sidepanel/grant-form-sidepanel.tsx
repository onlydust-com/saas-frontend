import { useEffect, useState } from "react";

import { Summary } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/_components/summary/summary";
import { useGrantFromPanel } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.hooks";
import { GrantFormSidepanelLoading } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.loading";
import { GrantFormSidePanelData } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardProject } from "@/design-system/molecules/cards/card-project";
import { toast } from "@/design-system/molecules/toaster";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantFormSidepanel() {
  const { capture } = usePosthog();
  const { name } = useGrantFromPanel();
  const { Panel, close: closeSidepanel, isOpen } = useSidePanel({ name });
  const { programId, projectId } = useSinglePanelData<GrantFormSidePanelData>(name) ?? { programId: "", projectId: "" };
  const [selectedBudget, setSelectedBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");

  const allocatedAmount = parseFloat(amount);
  const newBudgetBalance = (selectedBudget?.amount ?? 0) - allocatedAmount;
  const newBalanceIsNegative = newBudgetBalance < 0;

  const {
    data: program,
    isLoading,
    isError,
  } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  const { data: project } = ProgramReactQueryAdapter.client.useGetProgramProject({
    pathParams: {
      programId,
      projectId: projectId ?? "",
    },
    options: {
      enabled: Boolean(programId) && Boolean(projectId),
    },
  });

  useEffect(() => {
    if (isOpen && program) {
      setSelectedBudget(program.totalAvailable.totalPerCurrency?.[0]);
      setAmount("0");
      return;
    }

    if (!isOpen) {
      setSelectedBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isOpen, program]);

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: projectUsdAmount, code: projectUsdCode } = moneyKernelPort.format({
    amount: project?.totalAvailable.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  const { mutate, isPending } = ProgramReactQueryAdapter.client.useGrantBudgetToProject({
    pathParams: {
      programId,
    },
    options: {
      onSuccess: () => {
        closeSidepanel();

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

        capture("project_granted", { project_id: project?.id ?? "" });
      },
      onError: () => {
        toast.error(<Translate token={"programs:grantForm.error.toast"} />);
      },
    },
  });

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget?: DetailedTotalMoneyTotalPerCurrency) {
    setSelectedBudget(budget);
  }

  function handleGrantProject() {
    const projectId = project?.id;
    const currencyId = selectedBudget?.currency.id;

    if (!projectId || !currencyId) return;

    mutate({
      projectId,
      amount: allocatedAmount,
      currencyId,
    });
  }

  function renderContent() {
    if (isLoading) return <GrantFormSidepanelLoading />;

    if (isError) {
      return <ErrorState />;
    }

    if (!program || !project || !selectedBudget || !program.totalAvailable.totalPerCurrency) return null;

    return (
      <ScrollView>
        <div className="flex h-full flex-col gap-3">
          <CardProject
            title={project.name}
            logoUrl={project.logoUrl}
            buttonProps={{
              children: `${projectUsdAmount} ${projectUsdCode}`,
            }}
          />

          <div className="flex items-center">
            <AmountSelector
              amount={amount}
              onAmountChange={handleAmountChange}
              budget={selectedBudget}
              allBudgets={program.totalAvailable.totalPerCurrency}
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

          <Summary amount={amount} budget={selectedBudget} project={project} />
        </div>
      </ScrollView>
    );
  }

  return (
    <Panel>
      <SidePanelHeader canClose={true} canGoBack title={{ translate: { token: "programs:grantForm.title" } }} />

      <SidePanelBody>{renderContent()}</SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"primary"}
          size={"md"}
          onClick={handleGrantProject}
          isDisabled={isPending || !amount || newBalanceIsNegative}
        >
          <Translate token={"programs:grantForm.submit"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
