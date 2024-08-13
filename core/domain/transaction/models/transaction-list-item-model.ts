import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type TransactionResponse = components["schemas"]["ProgramTransactionPageItemResponse"];

export interface TransactionListItemInterface extends TransactionResponse {}

export class TransactionListItem implements TransactionListItemInterface {
  id!: TransactionResponse["id"];

  constructor(props: TransactionResponse) {
    Object.assign(this, props);
  }
}
