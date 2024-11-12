import {
  InvoiceHeaderBuilderProps,
  InvoiceInfoBuilderProps,
  RewardsSummaryBuilderProps,
} from "@/core/application/invoice-adapter/builders/builders.types";
import { bootstrap } from "@/core/bootstrap";

import {
  InvoiceHeaderProps,
  InvoiceInfoProps,
  InvoiceRewardsSummaryProps,
} from "@/shared/features/invoice/invoice.types";
import { InvoiceTokens } from "@/shared/features/invoice/tokens/invoice-tokens";

export function getHeaderProps({
  isSample,
  isUserIndividual,
  invoiceNumber,
}: InvoiceHeaderBuilderProps): InvoiceHeaderProps {
  let title = "";
  // provided as a query param string
  // this means a exemple that user can use to make their own invoice
  if (isSample === "true") {
    title = InvoiceTokens.header.sampleTitle;
  } else {
    title = `${
      isUserIndividual ? InvoiceTokens.header.receiptTitle : InvoiceTokens.header.invoiceTitle
    } #${invoiceNumber}`;
  }
  return {
    title,
  };
}

export function getInvoiceInfoProps({ isUserIndividual, invoiceDetails }: InvoiceInfoBuilderProps): InvoiceInfoProps {
  const dateKernelPort = bootstrap.getDateKernelPort();
  // as we can have multiple destination accounts, we need to handle them differently
  // bank account is an object containing only 2 fields
  // wallets is an array of objects containing 2 fields
  const bankAccount = invoiceDetails.destinationAccounts.bankAccount
    ? `${InvoiceTokens.invoiceInfos.accountNumber}: ${invoiceDetails.destinationAccounts.bankAccount.accountNumber} / ${InvoiceTokens.invoiceInfos.bic}: ${invoiceDetails.destinationAccounts.bankAccount.bic}`
    : null;
  const wallets = invoiceDetails.destinationAccounts.wallets?.length
    ? invoiceDetails.destinationAccounts.wallets.map(wallet => `${wallet.network}: ${wallet.address}`)
    : null;

  const accounts = [...(bankAccount ? [bankAccount] : []), ...(wallets ? [...wallets] : [])];

  const restInfos = {
    isUserIndividual,
    recipientInfos: {
      name: InvoiceTokens.invoiceInfos.wagmiName,
      address: InvoiceTokens.invoiceInfos.wagmiAddress,
      registrationNumber: InvoiceTokens.invoiceInfos.wagmiRegistrationNumber,
      euVATNumber: InvoiceTokens.invoiceInfos.wagmiEuVATNumber,
    },
    legalInfos: {
      generationDate: dateKernelPort.format(new Date(invoiceDetails.createdAt), "MM/dd/yyyy"),
      dueDate: dateKernelPort.format(new Date(invoiceDetails.dueAt), "MM/dd/yyyy"),
      destinationAccounts: accounts.flat(),
    },
  };

  if (isUserIndividual) {
    const billingProfile = invoiceDetails.individualBillingProfile;
    return {
      senderInfos: {
        name: `${billingProfile?.firstName ?? ""} ${billingProfile?.lastName ?? ""}`,
        address: billingProfile?.address ?? "",
      },
      ...restInfos,
    };
  } else {
    const billingProfile = invoiceDetails.companyBillingProfile;
    return {
      senderInfos: {
        name: billingProfile?.name ?? "",
        address: billingProfile?.address ?? "",
        euVATNumber: billingProfile?.euVATNumber,
      },
      ...restInfos,
    };
  }
}

export function getRewardsSummaryProps({
  isUserIndividual,
  invoiceDetails,
}: RewardsSummaryBuilderProps): InvoiceRewardsSummaryProps {
  const rewards = invoiceDetails.rewards;
  const totalBeforeTax = invoiceDetails.totalBeforeTax?.amount;
  const totalTax = invoiceDetails.totalTax?.amount;
  const totalAfterTax = invoiceDetails.totalAfterTax?.amount;
  const usdToEurConversionRate = invoiceDetails.usdToEurConversionRate;
  const totalAfterTaxPerCurrency = invoiceDetails.totalAfterTaxPerCurrency;
  const vat = {
    vatRegulationState: invoiceDetails.companyBillingProfile?.vatRegulationState,
    euVATNumber: invoiceDetails.companyBillingProfile?.euVATNumber,
    rate: invoiceDetails.taxRate,
  };

  return {
    isUserIndividual,
    rewards,
    vat,
    totalBeforeTax,
    totalTax,
    totalAfterTax,
    totalAfterTaxPerCurrency,
    usdToEurConversionRate,
  };
}
