import { useState } from "react";

import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";

import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";
import { SingleUserAmountSelector } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/_features/single-user-amount-selector/single-user-amount-selector";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { SingleUserFlowProps } from "./single-user-flow.types";

export function SingleUserFlow({ githubUserId, onValidate, isAmountValid, isDefaultOpen }: SingleUserFlowProps) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [step, setStep] = useState<"select" | "amount">("select");
  const { getAmount, updateAmount, removeAmount, getSelectedContributions, getAvatarUrl, getLogin } = useRewardFlow();
  const selectedContributions = getSelectedContributions(githubUserId);
  const { amount, budget } = getAmount(githubUserId);
  const avatarUrl = getAvatarUrl(githubUserId);
  const login = getLogin(githubUserId);

  function handleAmountChange(amount: string) {
    if (budget?.currency.id) {
      updateAmount(githubUserId, { budget, amount });
    }
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency | undefined) {
    if (budget?.currency.id) {
      updateAmount(githubUserId, { budget, amount });
    }
  }

  function handleBack() {
    setStep("select");
    removeAmount(githubUserId);
  }

  function handleValidate() {
    if (step === "select") {
      setStep("amount");
    } else if (Number(amount) > 0 && !!budget) {
      setIsOpen(false);
      onValidate(githubUserId);
    }
  }

  function isValidateDisabled() {
    if (step === "select") {
      return !selectedContributions?.length;
    }

    if (step === "amount") {
      return !budget || !Number(amount) || !isAmountValid;
    }
  }

  const accordionKey = `bulk-user-${githubUserId}`;

  return (
    <Accordion
      id={accordionKey}
      defaultSelected={isDefaultOpen ? [accordionKey] : undefined}
      controlled={{
        selectedKeys: [isOpen ? accordionKey : ""],
        onSelectionChange: () => setIsOpen(prev => !prev),
      }}
      titleProps={{ children: login }}
      startContent={<Avatar size={"xxs"} shape={"squared"} src={avatarUrl} />}
    >
      {step === "select" && <UserContributions githubUserId={githubUserId} containerHeight={392} />}
      {step === "amount" && (
        <div className={"w-full overflow-hidden"}>
          <SingleUserAmountSelector
            id={githubUserId}
            amount={amount}
            budget={budget}
            onAmountChange={handleAmountChange}
            onBudgetChange={handleBudgetChange}
          />
        </div>
      )}
      <div className={"flex flex-row justify-between"}>
        {step === "amount" ? (
          <Button
            size={"xs"}
            variant={"secondary"}
            onClick={handleBack}
            translate={{ token: "panels:bulkContributionSelection.back" }}
          />
        ) : (
          <div />
        )}
        <Button
          size={"xs"}
          variant={"primary"}
          onClick={handleValidate}
          translate={{ token: "panels:bulkContributionSelection.confirmButton" }}
          isDisabled={isValidateDisabled()}
        />
      </div>
    </Accordion>
  );
}
