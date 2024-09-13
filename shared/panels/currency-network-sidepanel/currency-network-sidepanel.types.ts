import { OnlyDustWallet } from "@/core/kernel/money/money.types";

export interface CurrencyNetworkSidepanelData {
  currencyId: string;
  onNetworkClick: ({
    currencyId,
    networkName,
    networkAddress,
  }: {
    currencyId: string;
    networkName: OnlyDustWallet["network"];
    networkAddress: OnlyDustWallet["address"];
  }) => void;
}
