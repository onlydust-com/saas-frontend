import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export interface CellBudgetProps {
  totalUsdEquivalent?: number | null | undefined;
  totalPerCurrency?: components["schemas"]["DetailedTotalMoneyTotalPerCurrencyInner"][];
}
