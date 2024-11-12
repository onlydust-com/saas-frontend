import { Document, Page, Text } from "@react-pdf/renderer";

import { InvoiceTemplateProps } from "@/shared/features/invoice/invoice.types";
import { InvoiceFooter } from "@/shared/features/invoice/sections/invoice-footer";
import { InvoiceHeader } from "@/shared/features/invoice/sections/invoice-header";
import { InvoiceInfo } from "@/shared/features/invoice/sections/invoice-infos";
import { InvoiceSummary } from "@/shared/features/invoice/sections/invoice-summary";

import { invoiceStyles } from "../styles/invoice.styles";

export function InvoiceTemplate({ fontFamily, header, invoiceInfos, rewardSummary, footer }: InvoiceTemplateProps) {
  return (
    <Document pageLayout="oneColumn">
      <Page size="A4" style={{ ...invoiceStyles.page, fontFamily }}>
        <InvoiceHeader title={header.title} />
        <InvoiceInfo
          senderInfos={invoiceInfos.senderInfos}
          recipientInfos={invoiceInfos.recipientInfos}
          legalInfos={invoiceInfos.legalInfos}
          isUserIndividual={invoiceInfos.isUserIndividual}
        />
        <InvoiceSummary
          isUserIndividual={rewardSummary.isUserIndividual}
          rewards={rewardSummary.rewards}
          vat={rewardSummary.vat}
          totalBeforeTax={rewardSummary.totalBeforeTax}
          totalTax={rewardSummary.totalTax}
          totalAfterTax={rewardSummary.totalAfterTax}
          usdToEurConversionRate={rewardSummary.usdToEurConversionRate}
          totalAfterTaxPerCurrency={rewardSummary.totalAfterTaxPerCurrency}
        />
        <InvoiceFooter invoiceName={footer.invoiceName} />
        <Text
          style={invoiceStyles.pageNumberFooter}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
