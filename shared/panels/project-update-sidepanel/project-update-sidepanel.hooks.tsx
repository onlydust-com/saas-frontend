import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { ProjectUpdateSidePanelData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

export function useProjectUpdateSidePanel() {
  return useSinglePanelContext<ProjectUpdateSidePanelData>("project-update");
}
