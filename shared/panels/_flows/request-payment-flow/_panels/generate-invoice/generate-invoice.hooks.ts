import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useGenerateInvoice() {
  return useSinglePanelContext("generate-invoice");
}
