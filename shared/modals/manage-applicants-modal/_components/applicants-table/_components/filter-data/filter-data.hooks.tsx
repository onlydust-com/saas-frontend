import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useApplicantsFilterDataSidePanel() {
  return useSinglePanelContext("applicants-filter-data");
}
