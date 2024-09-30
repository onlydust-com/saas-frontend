import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";

export interface ProjectFinancialProps {
  projectId: string;
}

export interface ProjectFinancialCardProps {
  type: "granted" | "rewarded";
  values: ProjectFinancialInterface["totalRewarded"] | ProjectFinancialInterface["totalGranted"];
}
