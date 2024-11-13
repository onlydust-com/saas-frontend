"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

import { OpenProps, RequestPaymentFlowContextInterface, SelectedState } from "./request-payment-flow.types";

export const RequestPaymentFlowContext = createContext<RequestPaymentFlowContextInterface>({
  billingProfileId: undefined,
  rewardIds: [],
  open: () => null,
  selectBillingProfile: () => null,
  selectRewards: () => null,
});

export function RequestPaymentFlowProvider({ children }: PropsWithChildren) {
  const [selectedState, setSelectedState] = useState<SelectedState>({
    billingProfileId: undefined,
    rewardIds: [],
  });

  function open(props?: OpenProps) {
    if (props?.initialState) {
      // open the right panel -> open the selected rewards panels
      setSelectedState({
        rewardIds: props.initialState.selectedRewardsIds,
        billingProfileId: props.initialState.selectedBillingProfileId,
      });
    } else {
      // open the right panel -> open the billing profile selection
    }
  }

  function onSelectRewards(billingProfileId: string, rewardIds: string[]) {
    setSelectedState({
      rewardIds,
      billingProfileId,
    });
  }

  function onSelectBillingProfile(billingProfileId: string) {
    setSelectedState({
      rewardIds: [],
      billingProfileId,
    });
  }

  return (
    <RequestPaymentFlowContext.Provider
      value={{
        rewardIds: selectedState.rewardIds,
        billingProfileId: selectedState.billingProfileId,
        open,
        selectRewards: onSelectRewards,
        selectBillingProfile: onSelectBillingProfile,
      }}
    >
      {children}
    </RequestPaymentFlowContext.Provider>
  );
}

export function useRequestPaymentFlow() {
  return useContext(RequestPaymentFlowContext);
}
