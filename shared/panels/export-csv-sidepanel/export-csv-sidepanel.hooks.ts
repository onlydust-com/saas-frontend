import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useExportCsvSidepanel() {
  return useSinglePanelContext("export-csv");
}
