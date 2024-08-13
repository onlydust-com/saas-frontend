import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { TransactionListItem } from "./transaction-list-item-model";

export type TransactionResponse = components["schemas"]["TransactionResponse"];

export interface TransactionInterface extends TransactionResponse {}

export class Transaction extends TransactionListItem implements TransactionInterface {
  constructor(props: TransactionResponse) {
    super(props);
    Object.assign(this, props);
  }
}
