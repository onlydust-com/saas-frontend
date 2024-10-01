import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";

export interface ProjectFinancialProps {
  data: ProjectFinancialInterface;
}

export interface ProjectFinancialCardProps {
  type: "granted" | "rewarded";
  values: ProjectFinancialProps["data"]["totalRewarded"] | ProjectFinancialProps["data"]["totalGranted"];
}
