import { useTranslation } from "react-i18next";

import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";
import { CardTemplate, CardTemplateLoading } from "@/design-system/molecules/cards/card-template";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useDepositTransactionSidepanel } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel.hooks";

export function DepositTransactionSidepanel() {
  const { t } = useTranslation();
  const { name } = useDepositTransactionSidepanel();
  const { Panel } = useSidePanel({ name });
  const { currencyId, networkName } = useSinglePanelData<{ currencyId: string; networkName: string }>(name) ?? {
    currencyId: "",
    networkName: "",
  };

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

  return (
    <Panel>
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
            children: networkName.toLowerCase(),
          }}
          border={"primary"}
          background={"secondary"}
        />

        <Accordion
          id={"depositInstructions"}
          defaultSelected={["depositInstructions"]}
          titleProps={{
            translate: { token: "panels:depositTransaction.depositInstructions" },
          }}
        >
          <div>
            {/* TODO @hayden */}
            <Typo size={"xs"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur consequatur ea error
              laudantium reprehenderit temporibus, vitae. Adipisci amet aperiam asperiores aspernatur at eaque eius
              natus, nemo placeat ratione vero!
            </Typo>
          </div>
        </Accordion>

        <Input
          name={"transactionReference"}
          size={"sm"}
          placeholder={t("panels:depositTransaction.transactionReference")}
          label={t("panels:depositTransaction.transactionReference")}
        />
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          onClick={() => {
            // TODO @hayden
          }}
          translate={{ token: "panels:depositTransaction.next" }}
        />
      </SidePanelFooter>
    </Panel>
  );
}
