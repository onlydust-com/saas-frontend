import { Text, View } from "@react-pdf/renderer";

import { bootstrap } from "@/core/bootstrap";

import { InvoiceVatInfoProps } from "@/shared/features/invoice/invoice.types";
import { InvoiceTokens } from "@/shared/features/invoice/tokens/invoice-tokens";

import { invoiceStyles } from "../styles/invoice.styles";

export function InvoiceVat({ vat, totalTax }: InvoiceVatInfoProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const renderVATApplicable = () => (
    <View style={invoiceStyles.tr}>
      <View style={invoiceStyles.tdSmall}></View>
      <Text style={invoiceStyles.td}></Text>
      <Text style={invoiceStyles.td}></Text>
      <Text style={invoiceStyles.td}></Text>
      <Text style={invoiceStyles.td}>
        <Text>{InvoiceTokens.rewardSummary.table.totalVat} </Text>
        <Text>{vat.rate ? `(${(vat.rate * 100).toFixed(0)}%)` : null}</Text>
      </Text>
      <Text style={invoiceStyles.td}>
        {moneyKernelPort.format({ amount: totalTax, currency: moneyKernelPort.getCurrency("USD") }).amount}
      </Text>
    </View>
  );

  const renderVATNotApplicable = (message: string) => (
    <View style={invoiceStyles.tr}>
      <Text style={{ ...invoiceStyles.td, fontSize: "10px" }}>{message}</Text>
    </View>
  );

  switch (vat.vatRegulationState) {
    case "VAT_NOT_APPLICABLE_NON_UE":
      return renderVATNotApplicable(InvoiceTokens.vatRegulationStates.vatNotApplicableNonUE);
    case "VAT_NOT_APPLICABLE_FRENCH_NOT_SUBJECT":
      return renderVATNotApplicable(InvoiceTokens.vatRegulationStates.vatNotApplicableFrenchNotSubject);
    case "VAT_REVERSE_CHARGE":
      return renderVATNotApplicable(InvoiceTokens.vatRegulationStates.vatReverseCharge);
    case "VAT_APPLICABLE":
    default:
      return renderVATApplicable();
  }
}
