import { CurrencyListSidepanel } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel";
import { CurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel";
import { DepositSummarySidepanel } from "@/shared/panels/deposit-summary-sidepanel/deposit-summary-sidepanel";
import { DepositTransactionSidepanel } from "@/shared/panels/deposit-transaction-sidepanel/deposit-transaction-sidepanel";

export function DepositFlow() {
  return (
    <>
      <CurrencyListSidepanel />
      <CurrencyNetworkSidepanel />
      <DepositTransactionSidepanel />
      <DepositSummarySidepanel />
    </>
  );
}
