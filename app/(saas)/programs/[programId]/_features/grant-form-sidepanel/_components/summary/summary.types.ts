import { ProgramProjectInterface } from "@/core/domain/program/models/program-project-model";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface SummaryProps {
  amount: string;
  budget: DetailedTotalMoneyTotalPerCurrency;
  project: ProgramProjectInterface;
}
