import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { CurrencyNetworkSidepanelData } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.types";

export function useCurrencyNetworkSidepanel() {
  return useSinglePanelContext<CurrencyNetworkSidepanelData>("currency-network");
}
