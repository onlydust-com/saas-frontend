import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useUploadInvoice() {
  return useSinglePanelContext("upload-invoice");
}
