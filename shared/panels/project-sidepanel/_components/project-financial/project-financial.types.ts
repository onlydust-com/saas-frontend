import { ProjectStatsInterface } from "@/core/domain/project/models/project-stats-model";

export interface ProjectFinancialProps {
  data: ProjectStatsInterface;
}

export interface ProjectFinancialCardProps {
  type: "granted" | "rewarded";
  values: ProjectFinancialProps["data"]["totalRewarded"] | ProjectFinancialProps["data"]["totalGranted"];
}
