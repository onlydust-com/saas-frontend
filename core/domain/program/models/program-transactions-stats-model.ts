import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProgramTransactionsStatsResponse = components["schemas"]["ProgramTransactionStatListResponse"];

export interface ProgramTransactionsStatsInterface extends ProgramTransactionsStatsResponse {}

export class ProgramTransactionsStats implements ProgramTransactionsStatsInterface {
  stats!: components["schemas"]["ProgramTransactionStatResponse"][];
  constructor(props: ProgramTransactionsStatsResponse) {
    Object.assign(this, props);
  }
}
