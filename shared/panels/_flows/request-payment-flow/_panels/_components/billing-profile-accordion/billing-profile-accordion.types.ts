import { BillingProfileTypeUnion } from "@/core/domain/billing-profile/billing-profile.types";

export interface BillingProfileAccordionProps {
  id: string;
  type: BillingProfileTypeUnion;
  name: string;
  rewardCount: number;
  accounts: {
    aptosAddress?: string | null;
    ethWallet?: string | null;
    optimismAddress?: string | null;
    starknetAddress?: string | null;
    nearAccountId?: string | null;
    stellarAccountId?: string | null;
  };
}
