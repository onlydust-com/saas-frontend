import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useGrantListSidePanel() {
  return useSinglePanelContext("grant-list");
}
