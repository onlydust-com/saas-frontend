import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useExportContributorsSidepanel() {
  return useSinglePanelContext("export-contributors");
}
