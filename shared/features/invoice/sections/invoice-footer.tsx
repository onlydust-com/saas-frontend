import { Text, View } from "@react-pdf/renderer";

import { InvoiceFooterProps } from "@/shared/features/invoice/invoice.types";
import { InvoiceTokens } from "@/shared/features/invoice/tokens/invoice-tokens";

import { invoiceStyles } from "../styles/invoice.styles";

export function InvoiceFooter({ invoiceName }: InvoiceFooterProps) {
  return (
    <View style={invoiceStyles.paddingHoriz30P} wrap={false}>
      <Text style={invoiceStyles.h4}>{InvoiceTokens.footer.title}</Text>
      <Text style={invoiceStyles.paragraph}>- {InvoiceTokens.footer.issuedBy(invoiceName)}</Text>
      <Text style={invoiceStyles.paragraph}>- {InvoiceTokens.footer.penalities}</Text>
    </View>
  );
}
