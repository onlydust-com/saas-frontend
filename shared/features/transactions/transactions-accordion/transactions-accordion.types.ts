import { ComponentType } from "react";

interface MonthlyTransaction {
  date: string;
  count: number;
}

export interface TransactionsAccordionProps {
  monthlyTransactions: MonthlyTransaction[];
  ContentComponent: ComponentType<{ date: Date }>;
}
