import { useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";

import { ContributorProfileCompactLoading } from "@/shared/features/contributors/contributor-profile-compact/contributor-profile-compact.loading";
import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";
import { SingleUserAmountSelector } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/_features/single-user-amount-selector/single-user-amount-selector";

import { SingleUserFlowProps } from "./single-user-flow.types";

export function SingleUserFlow({ githubUserId }: SingleUserFlowProps) {
  const [step, setStep] = useState<"select" | "amount">("select");
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");

  const { data, isLoading, isError } = UserReactQueryAdapter.client.useGetUserById({
    pathParams: { githubId: githubUserId },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency | undefined) {
    setBudget(budget);
  }

  if (isLoading) {
    return <ContributorProfileCompactLoading />;
  }

  if (!data || isError) return null;

  return (
    <Accordion
      id={`bulk-user-${githubUserId}`}
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
          onClick={() => setStep("amount")}
          translate={{ token: "panels:bulkContributionSelection.validateButton" }}
        />
      </div>
    </Accordion>
  );
}
