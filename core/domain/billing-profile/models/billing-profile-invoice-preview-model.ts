import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BillingProfileInvoicePreviewResponse = components["schemas"]["InvoicePreviewResponse"];

export interface BillingProfileInvoicePreviewInterface extends BillingProfileInvoicePreviewResponse {}

export class BillingProfileInvoicePreview implements BillingProfileInvoicePreviewInterface {
  billingProfileType!: BillingProfileInvoicePreviewResponse["billingProfileType"];
  companyBillingProfile!: BillingProfileInvoicePreviewResponse["companyBillingProfile"];
  createdAt!: BillingProfileInvoicePreviewResponse["createdAt"];
  destinationAccounts!: BillingProfileInvoicePreviewResponse["destinationAccounts"];
  dueAt!: BillingProfileInvoicePreviewResponse["dueAt"];
  id!: BillingProfileInvoicePreviewResponse["id"];
  individualBillingProfile!: BillingProfileInvoicePreviewResponse["individualBillingProfile"];
  number!: BillingProfileInvoicePreviewResponse["number"];
  rewards!: BillingProfileInvoicePreviewResponse["rewards"];
  taxRate!: BillingProfileInvoicePreviewResponse["taxRate"];
  totalAfterTax!: BillingProfileInvoicePreviewResponse["totalAfterTax"];
  totalAfterTaxPerCurrency!: BillingProfileInvoicePreviewResponse["totalAfterTaxPerCurrency"];
  totalBeforeTax!: BillingProfileInvoicePreviewResponse["totalBeforeTax"];
  totalTax!: BillingProfileInvoicePreviewResponse["totalTax"];
  usdToEurConversionRate!: BillingProfileInvoicePreviewResponse["usdToEurConversionRate"];

  constructor(props: BillingProfileInvoicePreviewResponse) {
    Object.assign(this, props);
  }
}
