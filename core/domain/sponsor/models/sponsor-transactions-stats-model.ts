import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type SponsorTransactionsStatsResponse = components["schemas"]["SponsorTransactionStatListResponse"];

export interface SponsorTransactionsStatsInterface extends SponsorTransactionsStatsResponse {}

export class SponsorTransactionsStats implements SponsorTransactionsStatsInterface {
  stats!: components["schemas"]["SponsorTransactionStatResponse"][];
  constructor(props: SponsorTransactionsStatsResponse) {
    Object.assign(this, props);
  }
}
