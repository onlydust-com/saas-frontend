import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { ProjectSidePanelData } from "@/shared/panels/project-sidepanel/project-sidepanel.types";

export function useProgramSidePanel() {
  return useSinglePanelContext<ProjectSidePanelData>("program-detail");
}
