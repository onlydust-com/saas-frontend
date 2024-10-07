import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useIssueSandboxPanel() {
  return useSinglePanelContext("issues-sandbox-panel");
}
