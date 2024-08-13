import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type GetProgramTransactionsStatsResponse = components["schemas"]["ProgramTransactionStatListResponse"];

export interface ProgramTransactionsStatsInterface extends GetProgramTransactionsStatsResponse {}

export class ProgramTransactionsStats implements ProgramTransactionsStatsInterface {
  stats!: components["schemas"]["ProgramTransactionStatResponse"][];
  constructor(props: GetProgramTransactionsStatsResponse) {
    Object.assign(this, props);
  }
}
