import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type TransactionResponse = components["schemas"]["ProgramTransactionPageItemResponse"];

export interface TransactionListItemInterface extends TransactionResponse {}

export class TransactionListItem implements TransactionListItemInterface {
  id!: TransactionResponse["id"];
  date!: TransactionResponse["date"];
  type!: TransactionResponse["type"];
  from!: TransactionResponse["from"];
  to!: TransactionResponse["to"];
  amount!: TransactionResponse["amount"];

  constructor(props: TransactionResponse) {
    Object.assign(this, props);
  }
}
