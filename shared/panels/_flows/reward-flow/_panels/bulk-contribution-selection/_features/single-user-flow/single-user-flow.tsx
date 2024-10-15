import { useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";

import { ContributorProfileCompactLoading } from "@/shared/features/contributors/contributor-profile-compact/contributor-profile-compact.loading";
import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";
import { SingleUserAmountSelector } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/_features/single-user-amount-selector/single-user-amount-selector";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { SingleUserFlowProps } from "./single-user-flow.types";

export function SingleUserFlow({ githubUserId, onValidate }: SingleUserFlowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"select" | "amount">("select");
  const { getAmount, updateAmount } = useRewardFlow();
  const { amount } = getAmount(githubUserId);
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();

  const { data, isLoading, isError } = UserReactQueryAdapter.client.useGetUserById({
    pathParams: { githubId: githubUserId },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  function handleAmountChange(amount: string) {
    if (budget?.currency.id) {
      updateAmount(githubUserId, { currencyId: budget.currency.id, amount });
    }
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency | undefined) {
    setBudget(budget);
    if (budget?.currency.id) {
      updateAmount(githubUserId, { currencyId: budget.currency.id, amount });
    }
  }

  if (isLoading) {
    return <ContributorProfileCompactLoading />;
  }

  function handleValidate() {
    if (step === "select") {
      setStep("amount");
    } else {
      setIsOpen(false);
      onValidate(githubUserId);
    }
  }

  if (!data || isError) return null;

  return (
    <Accordion
      id={`bulk-user-${githubUserId}`}
      controlled={{
        selectedKeys: [isOpen ? `bulk-user-${githubUserId}` : ""],
        onSelectionChange: () => setIsOpen(prev => !prev),
      }}
      titleProps={{ children: data.login }}
      startContent={<Avatar size={"xxs"} shape={"squared"} src={data.avatarUrl} />}
    >
      {step === "select" && (
        <div>
          <UserContributions githubUserId={githubUserId} />
        </div>
      )}
      {step === "amount" && (
        <div className={"w-full overflow-hidden"}>
          <SingleUserAmountSelector
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
            onClick={() => setStep("select")}
            translate={{ token: "panels:bulkContributionSelection.back" }}
          />
        ) : (
          <div />
        )}
        <Button
          size={"xs"}
          variant={"secondary"}
          onClick={handleValidate}
          translate={{ token: "panels:bulkContributionSelection.validateButton" }}
        />
      </div>
    </Accordion>
  );
}
