import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

import { OtherWorkSidepanelData } from "./other-work-sidepanel.types";

export function useOtherWorkSidepanel() {
  return useSinglePanelContext<OtherWorkSidepanelData>("reward-details-other-work");
}
