import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type TransactionListItemResponse = components["schemas"]["ProgramTransactionPageItemResponse"];

export interface TransactionListItemInterface extends TransactionListItemResponse {}

export class TransactionListItem implements TransactionListItemInterface {
  id!: TransactionListItemResponse["id"];
  date!: TransactionListItemResponse["date"];
  type!: TransactionListItemResponse["type"];
  from!: TransactionListItemResponse["from"];
  to!: TransactionListItemResponse["to"];
  amount!: TransactionListItemResponse["amount"];

  constructor(props: TransactionListItemResponse) {
    Object.assign(this, props);
  }
}
