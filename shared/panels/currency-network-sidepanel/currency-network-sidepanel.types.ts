import { OnlyDustWallet } from "@/core/kernel/money/money.types";

export interface CurrencyNetworkSidepanelData {
  currencyId: string;
  onNetworkClick: ({
    network,
    address,
  }: {
    network: NonNullable<OnlyDustWallet["network"]>;
    address: NonNullable<OnlyDustWallet["address"]>;
  }) => void;
}
