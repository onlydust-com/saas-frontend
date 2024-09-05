import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SponsorTransactionsStatsResponse = components["schemas"]["SponsorTransactionStatResponse"];

export interface SponsorTransactionsStatsInterface extends SponsorTransactionsStatsResponse {
  getStatTotalUsdEquivalent(key: keyof SponsorTransactionsStatsResponse): number;
}

export class SponsorTransactionsStats implements SponsorTransactionsStatsInterface {
  date!: SponsorTransactionsStatsResponse["date"];
  totalAllocated!: SponsorTransactionsStatsResponse["totalAllocated"];
  totalAvailable!: SponsorTransactionsStatsResponse["totalAvailable"];
  totalGranted!: SponsorTransactionsStatsResponse["totalGranted"];
  totalRewarded!: SponsorTransactionsStatsResponse["totalRewarded"];
  transactionCount!: SponsorTransactionsStatsResponse["transactionCount"];

  constructor(props: SponsorTransactionsStatsResponse) {
    Object.assign(this, props);
  }

  getStatTotalUsdEquivalent(key: keyof SponsorTransactionsStatsResponse) {
    const value = this[key];
    if (typeof value === "object" && value !== null && "totalUsdEquivalent" in value) {
      return Number(value.totalUsdEquivalent.toFixed(2));
    }
    return 0;
  }
}
