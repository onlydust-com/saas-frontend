import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { AllCurrencies } from "@/shared/panels/currency-list-sidepanel/_components/all-currencies/all-currencies";
import { UsedCurrencies } from "@/shared/panels/currency-list-sidepanel/_components/used-currencies/used-currencies";
import { useCurrencyListSidepanel } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel.hooks";
import { useCurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.hooks";

export function CurrencyListSidepanel() {
  const { name } = useCurrencyListSidepanel();
  const { Panel } = useSidePanel({ name });
  const { sponsorId } = useSinglePanelData<{ sponsorId: string }>(name) ?? {
    sponsorId: "",
  };
  const { open: openCurrencyNetworkSidepanel } = useCurrencyNetworkSidepanel();

  function handleNetworkClick(currencyId: string) {
    openCurrencyNetworkSidepanel({
      currencyId,
      sponsorId,
    });
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:currencyList.title" },
        }}
        canClose
      />

      <SidePanelBody>
        <div className="flex flex-1 flex-col gap-lg">
          <UsedCurrencies sponsorId={sponsorId} onActionClick={handleNetworkClick} />
          <AllCurrencies sponsorId={sponsorId} onActionClick={handleNetworkClick} />
        </div>
      </SidePanelBody>
    </Panel>
  );
}
