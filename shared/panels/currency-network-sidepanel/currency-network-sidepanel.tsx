import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";

import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { CardNetwork } from "@/shared/panels/currency-network-sidepanel/_components/card-network/card-network";
import { useCurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.hooks";

export function CurrencyNetworkSidepanel() {
  const { name } = useCurrencyNetworkSidepanel();
  const { Panel } = useSidePanel({ name });
  const { currencyId } = useSinglePanelData<{ currencyId: string }>(name) ?? {
    currencyId: "",
  };

  const { data, isLoading, isError } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

  if (isLoading) {
    return <AccordionLoading />;
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
          translate: { token: "panels:currencyNetwork.title" },
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
            translate: { token: "panels:currencyNetwork.title" },
          }}
          border={"primary"}
          background={"secondary"}
        />

        <Accordion
          id={"networks"}
          defaultSelected={["networks"]}
          titleProps={{
            translate: { token: "panels:currencyNetwork.network" },
          }}
        >
          {currency?.onlyDustWallets?.map(wallet => {
            return (
              <div key={wallet.address}>
                <CardNetwork networkLogoUrl={currency.logoUrl} networkName={wallet.network} />
              </div>
            );
          })}
        </Accordion>
      </SidePanelBody>
    </Panel>
  );
}
