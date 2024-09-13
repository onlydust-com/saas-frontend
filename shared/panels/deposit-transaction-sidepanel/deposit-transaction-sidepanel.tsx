import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";

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
import { useDepositTransactionSidepanel } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel.hooks";
import { DepositTransactionSidepanelData } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function DepositTransactionSidepanel() {
  const { t } = useTranslation();
  const { name } = useDepositTransactionSidepanel();
  const { Panel } = useSidePanel({ name });
  const { currencyId, network, address, onNextClick } = useSinglePanelData<DepositTransactionSidepanelData>(name) ?? {
    currencyId: "",
    network: "",
    address: "",
    onNextClick: () => {},
  };
  const [transactionReference, setTransactionReference] = useState<string>();
  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;

  const { data, isLoading, isError } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

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

  const currency = data.currencies.find(currency => currency.id === currencyId);

  function handleOpenFeedbackDrawer() {
    setIsOpen(true);
  }

  function handleSubmit() {
    if (transactionReference) {
      onNextClick(transactionReference);
    }
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

        <SidePanelBody>
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

          {
            // TODO @hayden handle condition
            false && (
              <Alert
                title={<Translate token={"panels:depositTransaction.error.title"} />}
                description={<Translate token={"panels:depositTransaction.error.description"} />}
                color={"error"}
                primaryButton={{
                  translate: { token: "panels:depositTransaction.error.contactSupport" },
                  onClick: handleOpenFeedbackDrawer,
                }}
              />
            )
          }
        </SidePanelBody>

        <SidePanelFooter>
          <Button
            type={"submit"}
            variant={"secondary"}
            size={"md"}
            translate={{ token: "panels:depositTransaction.next" }}
            isDisabled={!transactionReference}
          />
        </SidePanelFooter>
      </form>

      <FeedbackDrawer state={feedbackDrawerState} />
    </Panel>
  );
}
