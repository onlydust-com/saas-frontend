import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useProgramListSidepanel() {
  return useSinglePanelContext("program-list");
}
