import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useCurrencyListSidepanel() {
  return useSinglePanelContext("currency-list");
}
