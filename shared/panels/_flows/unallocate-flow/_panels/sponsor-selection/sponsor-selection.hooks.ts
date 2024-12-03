import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useSponsorSelection() {
  return useSinglePanelContext("unallocate-sponsor-selection");
}
