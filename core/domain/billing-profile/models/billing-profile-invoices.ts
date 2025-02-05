import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BillingProfileInvoicesResponse = components["schemas"]["BillingProfileInvoicesPageItemResponse"];

export interface BillingProfileInvoicesInterface extends BillingProfileInvoicesResponse {}

export class BillingProfileInvoices implements BillingProfileInvoicesInterface {
  id!: BillingProfileInvoicesResponse["id"];
  number!: BillingProfileInvoicesResponse["number"];
  createdAt!: BillingProfileInvoicesResponse["createdAt"];
  totalAfterTax!: BillingProfileInvoicesResponse["totalAfterTax"];
  status!: BillingProfileInvoicesResponse["status"];

  constructor(props: BillingProfileInvoicesResponse) {
    Object.assign(this, props);
  }
}
