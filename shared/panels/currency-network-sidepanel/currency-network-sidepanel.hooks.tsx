import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useCurrencyNetworkSidepanel() {
  return useSinglePanelContext("currency-network");
}
