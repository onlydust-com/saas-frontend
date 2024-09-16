import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Summary } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/summary/summary";
import { useGrantFromPanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.hooks";
import { GrantFormSidepanelLoading } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.loading";
import { GrantFormSidePanelData } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.types";

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
  const { programId } = useParams<{ programId: string }>();
  const { capture } = usePosthog();
  const { name } = useGrantFromPanel();
  const { Panel, close: closeSidepanel, isOpen } = useSidePanel({ name });
  const { projectId } = useSinglePanelData<GrantFormSidePanelData>(name) ?? { projectId: "" };
  const [selectedBudget, setSelectedBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");

  const { data, isLoading, isError } = ProgramReactQueryAdapter.client.useGetProgramById({
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
    if (isOpen && data) {
      setSelectedBudget(data.totalAvailable.totalPerCurrency?.[0]);
      setAmount("0");
      return;
    }

    if (!isOpen) {
      setSelectedBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isOpen, data]);

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

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency) {
    setSelectedBudget(budget);
  }

  function handleGrantProject() {
    const projectId = project?.id;
    const currencyId = selectedBudget?.currency.id;

    if (!projectId || !currencyId) return;

    mutate({
      projectId,
      amount: parseFloat(amount),
      currencyId,
    });
  }

  function renderContent() {
    if (isLoading) return <GrantFormSidepanelLoading />;

    if (isError) {
      return <ErrorState />;
    }

    if (!data || !project || !selectedBudget || !data.totalAvailable.totalPerCurrency) return null;

    return (
      <ScrollView>
        <div className="flex h-full flex-col gap-3">
          <CardProject
            title={project.name}
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
    );
  }

  return (
    <Panel>
      <SidePanelHeader canClose={true} canGoBack title={{ translate: { token: "programs:grantForm.title" } }} />

      <SidePanelBody>{renderContent()}</SidePanelBody>

      <SidePanelFooter>
        <Button variant={"secondary"} size={"md"} onClick={handleGrantProject} isDisabled={isPending || !amount}>
          <Translate token={"programs:grantForm.submit"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
