import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";

import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";
import { CardTemplate, CardTemplateLoading } from "@/design-system/molecules/cards/card-template";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { CardNetwork } from "@/shared/panels/currency-network-sidepanel/_components/card-network/card-network";
import { useCurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.hooks";
import { CurrencyNetworkSidepanelData } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.types";

export function CurrencyNetworkSidepanel() {
  const { name } = useCurrencyNetworkSidepanel();
  const { Panel } = useSidePanel({ name });
  const { currencyId, onNetworkClick } = useSinglePanelData<CurrencyNetworkSidepanelData>(name) ?? {
    currencyId: "",
    onNetworkClick: () => {},
  };

  const { data, isLoading, isError } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

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

    const currency = data.currencies.find(currency => currency.id === currencyId);

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
          {currency?.onlyDustWallets?.map(({ network, address }) => {
            if (network && address) {
              return (
                <div key={address}>
                  <CardNetwork
                    networkName={network}
                    onActionClick={() =>
                      onNetworkClick({
                        network,
                        address,
                      })
                    }
                  />
                </div>
              );
            }

            return null;
          })}
        </Accordion>
      </>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:currencyNetwork.title" },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>{renderContent()}</SidePanelBody>
    </Panel>
  );
}
