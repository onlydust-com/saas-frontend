import { GrantProject } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface SummaryProps {
  amount: string;
  budget: DetailedTotalMoneyTotalPerCurrency;
  project: GrantProject;
}
