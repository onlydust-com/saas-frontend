import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useBillingProfileSelection() {
  return useSinglePanelContext("billing-profile-selection");
}
