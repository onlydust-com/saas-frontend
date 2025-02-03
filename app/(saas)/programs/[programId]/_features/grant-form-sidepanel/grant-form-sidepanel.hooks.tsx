import { GrantFormSidePanelData } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.types";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useGrantFromPanel() {
  return useSinglePanelContext<GrantFormSidePanelData>("grant-form");
}
