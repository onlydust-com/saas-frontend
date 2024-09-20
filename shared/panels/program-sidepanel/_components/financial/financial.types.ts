import { ProgramInterface } from "@/core/domain/program/models/program-model";

export interface FinancialProps {
  data: ProgramInterface;
}

export interface FinancialCardProps {
  type: "available" | "granted";
  values: ProgramInterface["totalAvailable"] | ProgramInterface["totalGranted"];
}
