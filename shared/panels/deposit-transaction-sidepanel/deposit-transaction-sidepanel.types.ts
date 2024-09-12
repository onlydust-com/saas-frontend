import { OnlyDustWallet } from "@/core/kernel/money/money.types";

export interface DepositTransactionSidepanelData {
  currencyId: string;
  network: NonNullable<OnlyDustWallet["network"]>;
  address: NonNullable<OnlyDustWallet["address"]>;
  onNextClick: (transactionReference: string) => void;
}
