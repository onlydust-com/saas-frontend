import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { DepositReactQueryAdapter } from "@/core/application/react-query-adapter/deposit";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";
import { toast } from "@/design-system/molecules/toaster";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useDepositSummarySidepanel } from "@/shared/panels/deposit-summary-sidepanel/deposit-summary-sidepanel.hooks";
import {
  DepositSummaryFormValues,
  DepositSummarySidepanelData,
  depositSummaryFormValidation,
} from "@/shared/panels/deposit-summary-sidepanel/deposit-summary-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function DepositSummarySidepanel() {
  const { name } = useDepositSummarySidepanel();
  const { Panel, close } = useSidePanel({ name });
  const { depositId, sponsorId } = useSinglePanelData<DepositSummarySidepanelData>(name) ?? {
    depositId: "",
    sponsorId: "",
  };
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm<DepositSummaryFormValues>({
    resolver: zodResolver(depositSummaryFormValidation),
  });

  const {
    data: deposit,
    isLoading,
    isError,
  } = DepositReactQueryAdapter.client.useGetDeposit({
    pathParams: {
      depositId,
    },
    options: {
      enabled: Boolean(depositId),
    },
  });

  const { mutate: updateDeposit, isPending: updateDepositIsPending } = DepositReactQueryAdapter.client.useUpdateDeposit(
    {
      pathParams: { depositId: deposit?.id ?? "" },
      options: {
        onSuccess: () => {
          if (deposit) {
            toast.success(
              t("panels:depositSummary.toast.success", {
                amount: deposit.amount.prettyAmount,
                code: deposit.amount.currency.code,
              })
            );
            close();
          }
        },
        onError: () => {
          toast.error(t("panels:depositSummary.toast.error"));
        },
      },
      invalidateTagParams: {
        sponsor: {
          pathParams: { sponsorId },
        },
      },
    }
  );

  useEffect(() => {
    if (deposit?.latestBillingInformation) {
      const billingInformation = Object.fromEntries(
        // We only want non-null values
        Object.entries(deposit.latestBillingInformation).filter(([, value]) => Boolean(value))
      );

      reset({ billingInformation });
    }
  }, [deposit]);

  function submitForm(values: DepositSummaryFormValues) {
    updateDeposit(values);
  }

  function renderContent() {
    if (isLoading) {
      return (
        <>
          <AmountSelectorLoading />
          <AccordionLoading />
        </>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!deposit) return null;

    return (
      <>
        <div className="flex items-center">
          <AmountSelector readOnly amount={String(deposit.amount.amount)} budget={deposit.amount} />
        </div>

        <Accordion
          id={"senderInformation"}
          startIcon={{
            component: CheckCircle,
          }}
          titleProps={{
            translate: { token: "panels:depositSummary.senderInformation.title" },
          }}
        >
          <div className={"grid gap-md"}>
            <Input
              name={"accountNumber"}
              value={deposit.senderInformation.accountNumber}
              label={<Translate token={"panels:depositSummary.senderInformation.accountNumber"} />}
              readOnly
              isDisabled
            />
            <Input
              name={"senderName"}
              value={deposit.senderInformation.name}
              label={<Translate token={"panels:depositSummary.senderInformation.senderName"} />}
              readOnly
              isDisabled
            />
            <Input
              name={"reference"}
              value={deposit.senderInformation.transactionReference}
              label={<Translate token={"panels:depositSummary.senderInformation.reference"} />}
              readOnly
              isDisabled
            />
          </div>
        </Accordion>

        <Accordion
          id={"billingInformation"}
          defaultSelected={!deposit.latestBillingInformation ? ["billingInformation"] : undefined}
          startIcon={
            deposit.latestBillingInformation
              ? {
                  component: CheckCircle,
                }
              : undefined
          }
          titleProps={{
            translate: { token: "panels:depositSummary.billingInformation.title" },
          }}
        >
          <div className={"grid gap-md"}>
            <Controller
              name="billingInformation.companyName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.companyName"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.companyAddress"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.companyAddress"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.companyCountry"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.companyCountry"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.companyId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.companyId"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.vatNumber"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.vatNumber"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.billingEmail"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.billingEmail"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.firstName"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.lastName"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />

            <Controller
              name="billingInformation.email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label={<Translate token={"panels:depositSummary.billingInformation.email"} />}
                  {...field}
                  isError={!!error}
                  error={
                    error?.message
                      ? {
                          text: error.message,
                        }
                      : undefined
                  }
                />
              )}
            />
          </div>
        </Accordion>

        <CardBudgetAccordion
          defaultSelected={["summary"]}
          items={[
            {
              id: "summary",
              titleProps: {
                translate: {
                  token: "panels:depositSummary.transactionSummary.title",
                },
              },
              cards: [
                {
                  amount: {
                    value: deposit.currentBalance.amount,
                    currency: deposit.currentBalance.currency,
                    usdEquivalent: deposit.currentBalance.usdEquivalent ?? 0,
                  },
                  badgeProps: {
                    children: <Translate token={"panels:depositSummary.transactionSummary.currentBalance"} />,
                  },
                },
                {
                  amount: {
                    value: deposit.amount.amount,
                    currency: deposit.amount.currency,
                    usdEquivalent: deposit.amount.usdEquivalent ?? 0,
                  },
                  badgeProps: { children: <Translate token={"panels:depositSummary.transactionSummary.deposit"} /> },
                },
                {
                  amount: {
                    value: deposit.finalBalance.amount,
                    currency: deposit.finalBalance.currency,
                    usdEquivalent: deposit.finalBalance.usdEquivalent ?? 0,
                  },
                  badgeProps: {
                    children: <Translate token={"panels:depositSummary.transactionSummary.finalBalance"} />,
                  },
                },
              ],
            },
          ]}
        />
      </>
    );
  }

  return (
    <Panel>
      <form className={"flex h-full flex-col gap-px"} onSubmit={handleSubmit(submitForm)}>
        <SidePanelHeader
          title={{
            translate: { token: "panels:depositSummary.title" },
          }}
          canGoBack
          canClose
        />

        <SidePanelBody>{renderContent()}</SidePanelBody>

        <SidePanelFooter>
          <Button
            type={"submit"}
            variant={"primary"}
            size={"md"}
            translate={{ token: "panels:depositSummary.done" }}
            isDisabled={isLoading || isError || updateDepositIsPending}
          />
        </SidePanelFooter>
      </form>
    </Panel>
  );
}
