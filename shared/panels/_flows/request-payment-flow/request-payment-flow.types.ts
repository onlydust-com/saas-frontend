import { PropsWithChildren } from "react";

export interface RequestPaymentFlowContextProps extends PropsWithChildren {}

export interface OpenProps {
  initialState?: {
    selectedRewardsIds: string[];
    selectedBillingProfileId: string;
  };
}

export interface SelectedState {
  rewardIds: string[];
  billingProfileId?: string;
}

export interface RequestPaymentFlowContextInterface {
  rewardIds: string[];
  billingProfileId?: string;
  open: (props?: OpenProps) => void;
  selectBillingProfile: (billingProfileId: string) => void;
  selectRewards: (billingProfileId: string, rewardsIds: string[]) => void;
}

// const useInvoicePreview -> call the context with billing profile and rewards id and return the preview data
