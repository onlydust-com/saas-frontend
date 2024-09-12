import { OnlyDustWallet } from "@/core/kernel/money/money.types";

export interface DepositSummarySidepanelData {
  sponsorId: string;
  network: NonNullable<OnlyDustWallet["network"]>;
  transactionReference: string;
}
