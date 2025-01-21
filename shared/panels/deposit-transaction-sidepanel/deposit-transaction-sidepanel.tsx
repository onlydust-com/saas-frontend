import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";
import { DepositReactQueryAdapter } from "@/core/application/react-query-adapter/deposit";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AccordionLoading } from "@/design-system/molecules/accordion";
import { Alert } from "@/design-system/molecules/alert";
import { CardTemplate, CardTemplateLoading } from "@/design-system/molecules/cards/card-template";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useDepositSummarySidepanel } from "@/shared/panels/deposit-summary-sidepanel/deposit-summary-sidepanel.hooks";
import { useDepositTransactionSidepanel } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel.hooks";
import { DepositTransactionSidepanelData } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function DepositTransactionSidepanel() {
  const { t } = useTranslation();
  const { name, isOpen } = useDepositTransactionSidepanel();
  const { Panel } = useSidePanel({ name });
  const { currencyId, network, address, sponsorId } = useSinglePanelData<DepositTransactionSidepanelData>(name) ?? {
    currencyId: "",
    network: "",
    address: "",
    sponsorId: "",
  };
  const { open: openDepositSummarySidepanel } = useDepositSummarySidepanel();
  const [transactionReference, setTransactionReference] = useState<string>();
  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;

  const { data, isLoading, isError } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

  const {
    mutate: previewDeposit,
    isPending: previewDepositIsPending,
    isError: previewDepositIsError,
  } = DepositReactQueryAdapter.client.usePreviewDeposit({
    pathParams: { sponsorId },
    options: {
      onSuccess: data => {
        openDepositSummarySidepanel({ depositId: data.id, sponsorId });
      },
    },
  });

  const currency = data?.currencies.find(currency => currency.id === currencyId);

  useEffect(() => {
    if (isOpen) {
      setTransactionReference("");
    }
  }, [isOpen]);

  function handleOpenFeedbackDrawer() {
    setIsOpen(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (transactionReference && network) {
      previewDeposit({
        network,
        transactionReference,
      });
    }
  }

  function renderContent() {
    if (isLoading) {
      return (
        <>
          <CardTemplateLoading />
          <AccordionLoading />
        </>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!data) return null;

    return (
      <>
        <CardTemplate
          avatarProps={{
            src: currency?.logoUrl,
          }}
          titleProps={{
            children: currency?.name,
          }}
          descriptionProps={{
            classNames: { base: "capitalize" },
            children: network?.toLowerCase(),
          }}
          border={"primary"}
          background={"secondary"}
        />

        <Paper size={"lg"} border={"primary"} background={"primary"}>
          <Typo
            size={"sm"}
            classNames={{ base: "break-words whitespace-pre-line" }}
            translate={{
              token: "panels:depositTransaction.depositInstructions",
              values: { name: network, address },
            }}
          />
        </Paper>

        <Alert
          title={<Translate token={"panels:depositTransaction.disclaimer.title"} />}
          description={<Translate token={"panels:depositTransaction.disclaimer.description"} />}
          color={"brand"}
        />

        <Input
          name={"transactionReference"}
          size={"sm"}
          placeholder={t("panels:depositTransaction.transactionReference")}
          label={t("panels:depositTransaction.transactionReference")}
          value={transactionReference}
          onChange={e => setTransactionReference(e.target.value)}
        />

        {previewDepositIsError ? (
          <Alert
            title={<Translate token={"panels:depositTransaction.error.title"} />}
            description={<Translate token={"panels:depositTransaction.error.description"} />}
            color={"error"}
            primaryButton={{
              translate: { token: "panels:depositTransaction.error.contactSupport" },
              onClick: handleOpenFeedbackDrawer,
            }}
          />
        ) : null}
      </>
    );
  }

  return (
    <Panel>
      <form className={"flex h-full flex-col gap-px"} onSubmit={handleSubmit}>
        <SidePanelHeader
          title={{
            translate: { token: "panels:depositTransaction.title" },
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
            translate={{ token: "panels:depositTransaction.next" }}
            isDisabled={!transactionReference || previewDepositIsPending}
          />
        </SidePanelFooter>
      </form>

      <FeedbackDrawer state={feedbackDrawerState} />
    </Panel>
  );
}
