import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { AddRepoToProjectSidePanelData } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/add-repo-to-project-side-panel.types";

export function useAddRepoToProjectSidePanel() {
  return useSinglePanelContext<AddRepoToProjectSidePanelData>("project-update-add-repo");
}
