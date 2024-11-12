import { BillingProfileInvoicePreviewInterface } from "@/core/domain/billing-profile/models/billing-profile-invoice-preview-model";

export interface InvoiceHeaderBuilderProps {
  isSample: string;
  isUserIndividual: boolean;
  invoiceNumber: string;
}

export interface InvoiceInfoBuilderProps {
  isUserIndividual: boolean;
  invoiceDetails: BillingProfileInvoicePreviewInterface;
}

export interface RewardsSummaryBuilderProps {
  isUserIndividual: boolean;
  invoiceDetails: BillingProfileInvoicePreviewInterface;
}
