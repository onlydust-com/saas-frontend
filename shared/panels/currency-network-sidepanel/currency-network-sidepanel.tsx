import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useCurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.hooks";

export function CurrencyNetworkSidepanel() {
  const { name } = useCurrencyNetworkSidepanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:currencyNetwork.title" },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>Content</SidePanelBody>
    </Panel>
  );
}
