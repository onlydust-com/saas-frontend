import { GetBillingProfileInvoicePreviewByIdResponse } from "@/core/domain/billing-profile/billing-profile-contract.types";
import { VatRegulationState } from "@/core/domain/billing-profile/billing-profile.types";
import { Currency } from "@/core/kernel/money/money.types";

interface SenderInfo {
  firstName?: string;
  lastName?: string;
  name?: string;
  address: string;
  registrationNumber?: string;
  euVATNumber?: string;
}

interface RecipientInfo {
  name: string;
  address: string;
  registrationNumber?: string;
  euVATNumber?: string;
}

interface LegalInfo {
  generationDate: string;
  dueDate: string;
  destinationAccounts: (string | string[] | null)[];
}

interface Vat {
  vatRegulationState?: VatRegulationState;
  euVATNumber: string | undefined;
  rate: number | undefined;
}

export interface InvoiceHeaderProps {
  title: string;
}

export interface InvoiceInfoProps {
  isUserIndividual: boolean;
  senderInfos: SenderInfo;
  recipientInfos: RecipientInfo;
  legalInfos: LegalInfo;
}

export interface InvoiceVatInfoProps {
  vat: Vat;
  totalTax: number | undefined;
}

export interface InvoiceRewardsSummaryProps {
  isUserIndividual: boolean;
  rewards: GetBillingProfileInvoicePreviewByIdResponse["rewards"];
  vat: Vat;
  totalBeforeTax: number | undefined;
  totalTax: number | undefined;
  totalAfterTax: number | undefined;
  usdToEurConversionRate: number | undefined;
  totalAfterTaxPerCurrency: { currency: Currency; amount: number }[] | undefined;
}

export interface InvoiceFooterProps {
  invoiceName: string;
}

export interface InvoiceTemplateProps {
  fontFamily: string;
  header: InvoiceHeaderProps;
  invoiceInfos: InvoiceInfoProps;
  rewardSummary: InvoiceRewardsSummaryProps;
  footer: InvoiceFooterProps;
}
