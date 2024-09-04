import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SponsorTransactionsStatsResponse = components["schemas"]["SponsorTransactionStatListResponse"];

export interface SponsorTransactionsStatsInterface extends SponsorTransactionsStatsResponse {
  calculateSeries(key: keyof SponsorTransactionsStatsResponse["stats"][number]): number[];
}

export class SponsorTransactionsStats implements SponsorTransactionsStatsInterface {
  stats!: components["schemas"]["SponsorTransactionStatResponse"][];
  constructor(props: SponsorTransactionsStatsResponse) {
    Object.assign(this, props);
  }

  calculateSeries(key: keyof SponsorTransactionsStatsResponse["stats"][number]) {
    return (
      this.stats?.map(stat => {
        const value = stat[key];
        if (typeof value === "object" && value !== null && "totalUsdEquivalent" in value) {
          return Number(value.totalUsdEquivalent.toFixed(2));
        }
        return 0;
      }) ?? []
    );
  }
}
