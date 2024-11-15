import { Text, View } from "@react-pdf/renderer";

import { InvoiceHeaderProps } from "@/shared/features/invoice/invoice.types";

import { invoiceStyles } from "../styles/invoice.styles";

export function InvoiceHeader({ title }: InvoiceHeaderProps) {
  return (
    <View style={invoiceStyles.header}>
      <Text>{title}</Text>
    </View>
  );
}
