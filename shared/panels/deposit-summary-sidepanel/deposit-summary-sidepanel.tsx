import { useEffect, useState } from "react";

import { DepositReactQueryAdapter } from "@/core/application/react-query-adapter/deposit";
import { DepositPreviewInterface } from "@/core/domain/deposit/models/deposit-preview-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useDepositSummarySidepanel } from "@/shared/panels/deposit-summary-sidepanel/deposit-summary-sidepanel.hooks";

export function DepositSummarySidepanel() {
  const { name } = useDepositSummarySidepanel();
  const { Panel } = useSidePanel({ name });
  const { sponsorId, network, transactionReference } = useSinglePanelData<{
    sponsorId: string;
    network: string;
    transactionReference: string;
  }>(name) ?? {
    sponsorId: "",
    network: "",
    transactionReference: "",
  };
  const [depositPreview, setDepositPreview] = useState<DepositPreviewInterface>();

  const {
    mutate: previewDeposit,
    isPending: previewDepositIsPending,
    isError: previewDepositIsError,
  } = DepositReactQueryAdapter.client.usePreviewDeposit({
    pathParams: { sponsorId },
    options: {
      onSuccess: data => {
        setDepositPreview(data);
      },
    },
  });

  useEffect(() => {
    if (network && transactionReference) {
      previewDeposit({
        network,
        transactionReference,
      });
    }
  }, [previewDeposit, network, transactionReference]);

  function renderContent() {
    if (previewDepositIsPending) {
      return (
        <>
          <AmountSelectorLoading />
          <AccordionLoading />
        </>
      );
    }

    if (previewDepositIsError) {
      return <ErrorState />;
    }

    if (!depositPreview) return null;

    return (
      <>
        <div className="flex max-h-72 flex-1 items-center">
          <AmountSelector readOnly amount={depositPreview.amount.amount.toString()} budget={depositPreview.amount} />
        </div>

        <Accordion
          id={"senderInformation"}
          titleProps={{
            translate: { token: "panels:depositSummary.senderInformation.title" },
          }}
        >
          Sender information
        </Accordion>

        <Accordion
          id={"billingInformation"}
          titleProps={{
            translate: { token: "panels:depositSummary.billingInformation.title" },
          }}
        >
          Billing information
        </Accordion>

        <Accordion
          id={"transactionSummary"}
          defaultSelected={["transactionSummary"]}
          titleProps={{
            translate: { token: "panels:depositSummary.transactionSummary.title" },
          }}
        >
          Summary
        </Accordion>
      </>
    );
  }

  return (
    <Panel>
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
          variant={"secondary"}
          size={"sm"}
          translate={{ token: "panels:depositSummary.done" }}
          onClick={() => {
            // TODO @hayden
          }}
        />
      </SidePanelFooter>
    </Panel>
  );
}
