import { useEffect, useMemo, useState } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SingleUserFlow } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/_features/single-user-flow/single-user-flow";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { useBulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

function TotalAmounts() {
  const { amountPerCurrency } = useRewardFlow();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const hasAmountPerCurrency = Object.keys(amountPerCurrency).length > 0;

  if (hasAmountPerCurrency) {
    return (
      <Accordion
        id={"reward-amounts"}
        defaultSelected={["reward-amounts"]}
        titleProps={{
          translate: {
            token: "panels:bulkContributionSelection.available",
          },
        }}
      >
        <div className={"grid gap-md"}>
          {Object.values(amountPerCurrency).map(({ amount, budget }) => {
            if (!budget) return null;

            const isError = Number(amount) > budget.amount;

            const { amount: formattedAmount, code } = moneyKernelPort.format({
              amount: Number(amount),
              currency: budget.currency,
            });

            return (
              <CardBudget
                key={budget.currency.id}
                amount={{
                  value: budget.amount,
                  currency: budget.currency,
                  usdEquivalent: budget.usdEquivalent ?? 0,
                }}
                background={"secondary"}
                border={"primary"}
                badgeProps={{ color: isError ? "error" : "brand", children: `- ${formattedAmount} ${code}` }}
              />
            );
          })}
        </div>
      </Accordion>
    );
  }

  return null;
}

function Content() {
  const { open } = useBulkContributionValidation();
  const { isOpen } = useBulkContributionSelection();
  const { selectedGithubUserIds, amountPerCurrency } = useRewardFlow();
  const [isRewardValid, setIsRewardValid] = useState<Record<number, boolean>>({});
  const isAmountInvalid = Boolean(
    Object.values(amountPerCurrency).find(({ amount, budget }) => (budget ? Number(amount) > budget.amount : false))
  );

  useEffect(() => {
    setIsRewardValid(prev => {
      const newIsValid = { ...prev };
      selectedGithubUserIds.forEach(id => {
        newIsValid[id] = prev[id] ?? false;
      });
      return newIsValid;
    });
  }, [selectedGithubUserIds]);

  function handleValidate(githubUserId: number) {
    setIsRewardValid(prev => {
      const newIsValid = { ...prev };
      newIsValid[githubUserId] = true;
      return newIsValid;
    });
  }

  const isAllValid = useMemo(() => {
    return Object.values(isRewardValid).every(Boolean);
  }, [isRewardValid]);

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:bulkContributionSelection.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <TotalAmounts />

        {isOpen && (
          <div className={"flex w-full flex-col gap-lg"}>
            {selectedGithubUserIds.map((githubUserId, index) => (
              <SingleUserFlow
                githubUserId={githubUserId}
                key={githubUserId}
                onValidate={handleValidate}
                isAmountValid={!isAmountInvalid}
                isDefaultOpen={index === 0}
              />
            ))}
          </div>
        )}
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:next",
          }}
          isDisabled={!isAllValid}
          onClick={open}
        />
      </SidePanelFooter>
    </>
  );
}

export function BulkContributionSelection() {
  const { name } = useBulkContributionSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
