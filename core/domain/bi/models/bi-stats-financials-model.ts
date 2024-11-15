import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiStatsFinancialsResponse = components["schemas"]["BiFinancialsStatsResponse"];

export interface BiStatsFinancialsInterface extends BiStatsFinancialsResponse {
  getStatTotalUsdEquivalent(key: keyof BiStatsFinancialsResponse): number;
}

export class BiStatsFinancials implements BiStatsFinancialsInterface {
  date!: BiStatsFinancialsResponse["date"];
  totalAllocated!: BiStatsFinancialsResponse["totalAllocated"];
  totalDeposited!: BiStatsFinancialsResponse["totalDeposited"];
  totalGranted!: BiStatsFinancialsResponse["totalGranted"];
  totalRewarded!: BiStatsFinancialsResponse["totalRewarded"];
  transactionCount!: BiStatsFinancialsResponse["transactionCount"];

  constructor(props: BiStatsFinancialsResponse) {
    Object.assign(this, props);
  }

  getStatTotalUsdEquivalent(key: keyof BiStatsFinancialsResponse) {
    const value = this[key];
    if (typeof value === "object" && value !== null && "totalUsdEquivalent" in value) {
      return Number(value.totalUsdEquivalent.toFixed(2));
    }
    return 0;
  }
}
