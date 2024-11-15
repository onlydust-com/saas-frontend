import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useAcceptInvoicingMandate() {
  return useSinglePanelContext("accept-invoicing-mandate");
}
