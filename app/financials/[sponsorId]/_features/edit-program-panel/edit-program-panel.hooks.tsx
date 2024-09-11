import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useEditProgramPanel() {
  return useSinglePanelContext<{ programId: string; sponsorId?: string }>("edit-program");
}
