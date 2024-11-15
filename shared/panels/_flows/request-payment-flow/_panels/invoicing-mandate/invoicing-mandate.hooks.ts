import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useInvoicingMandate() {
  return useSinglePanelContext("invoicing-mandate");
}
