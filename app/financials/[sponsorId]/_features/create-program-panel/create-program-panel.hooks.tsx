import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useCreateProgramPanel() {
  return useSinglePanelContext<{ sponsorId: string }>("create-program");
}
