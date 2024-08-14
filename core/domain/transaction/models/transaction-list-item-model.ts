import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type TransactionListItemResponse = components["schemas"]["ProgramTransactionPageItemResponse"];

export interface TransactionListItemInterface extends TransactionListItemResponse {}

export class TransactionListItem implements TransactionListItemInterface {
  amount!: TransactionListItemResponse["amount"];
  date!: TransactionListItemResponse["date"];
  id!: TransactionListItemResponse["id"];
  thirdParty!: TransactionListItemResponse["thirdParty"];
  type!: TransactionListItemResponse["type"];

  constructor(props: TransactionListItemResponse) {
    Object.assign(this, props);
  }
}
