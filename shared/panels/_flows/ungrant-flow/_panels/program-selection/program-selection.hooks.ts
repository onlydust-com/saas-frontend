import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useProgramSelection() {
  return useSinglePanelContext("ungrant-program-selection");
}
