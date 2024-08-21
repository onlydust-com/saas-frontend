import { PropsWithChildren } from "react";

import { GrantProject } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";

function Section({ children }: PropsWithChildren) {
  return (
    <section className="rounded-lg border border-container-stroke-separator bg-container-3 px-4 py-3">
      {children}
    </section>
  );
}

export function Summary({
  amount,
  budget,
  project,
}: {
  amount: number;
  budget: DetailedTotalMoneyTotalPerCurrency;
  project: GrantProject;
}) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { amount: currentBudgetBalance } = moneyKernelPort.format({
    amount: budget.amount,
    currency: budget.currency,
  });

  const { amount: formattedAmount } = moneyKernelPort.format({
    amount,
    currency: budget.currency,
  });

  const { amount: newBudgetBalance } = moneyKernelPort.format({
    amount: budget.amount - amount,
    currency: budget.currency,
  });

  const projectBudget = project.totalAvailable.totalPerCurrency?.find(b => {
    return b.currency.id === budget.currency.id;
  });

  const rawCurrentProjectBalance = projectBudget?.amount ?? 0;

  const { amount: currentProjectBalance } = moneyKernelPort.format({
    amount: rawCurrentProjectBalance,
    currency: budget.currency,
  });

  const { amount: newProjectBalance } = moneyKernelPort.format({
    amount: rawCurrentProjectBalance + amount,
    currency: budget.currency,
  });

  return (
    <Paper size={"s"} container={"transparent"}>
      <div className="grid gap-3">
        <header className={"flex items-center gap-1"}>
          <Icon name={"ri-pie-chart-line"} size={16} />
          <Typo size={"xs"} weight={"medium"} translate={{ token: "programs:grantForm.summary.title" }} />
        </header>

        <Section>
          <div className="mb-4 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: budget.currency.logoUrl,
                alt: budget.currency.name,
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.balance",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              {currentBudgetBalance} {budget.currency.code}
            </Typo>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: budget.currency.logoUrl,
                alt: budget.currency.name,
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.grant",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <div className={"flex items-center gap-1"}>
              <Icon name={"ri-arrow-right-line"} className={"text-label-blue"} />
              <Typo size={"s"}>
                {formattedAmount} {budget.currency.code}
              </Typo>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-container-stroke-separator pt-2">
            <AvatarDescription
              avatarProps={{
                src: budget.currency.logoUrl,
                alt: budget.currency.name,
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.balance",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              {newBudgetBalance} {budget.currency.code}
            </Typo>
          </div>
        </Section>

        <Section>
          <div className="mb-4 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: project.logoUrl,
                alt: project.name,
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.project.balance",
                  values: {
                    project: project.name,
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              {currentProjectBalance} {budget.currency.code}
            </Typo>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <AvatarDescription
              avatarProps={{
                src: project.logoUrl,
                alt: project.name,
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.grant",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <div className={"flex items-center gap-1"}>
              <Icon name={"ri-arrow-down-line"} className={"text-label-green"} />
              <Typo size={"s"}>
                {formattedAmount} {budget.currency.code}
              </Typo>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-container-stroke-separator pt-2">
            <AvatarDescription
              avatarProps={{
                src: project.logoUrl,
                alt: project.name,
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.project.balance",
                  values: {
                    project: project.name,
                  },
                },
              }}
            />

            <Typo size={"s"} color={"text-2"}>
              {newProjectBalance} {budget.currency.code}
            </Typo>
          </div>
        </Section>
      </div>
    </Paper>
  );
}
