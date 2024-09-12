import { OnlyDustWallet } from "@/core/kernel/money/money.types";

export interface DepositTransactionSidepanelData {
  currencyId: string;
  networkName: OnlyDustWallet["network"];
  networkAddress: OnlyDustWallet["address"];
}
