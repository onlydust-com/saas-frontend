import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { ProgramSidePanelData } from "@/shared/panels/program-sidepanel/program-sidepanel.types";

export function useProgramSidePanel() {
  return useSinglePanelContext<ProgramSidePanelData>("program-detail");
}
