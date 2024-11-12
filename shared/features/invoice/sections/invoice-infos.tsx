import { Text, View } from "@react-pdf/renderer";

import { InvoiceInfoProps } from "@/shared/features/invoice/invoice.types";
import { InvoiceTokens } from "@/shared/features/invoice/tokens/invoice-tokens";

import { invoiceStyles } from "../styles/invoice.styles";

export function InvoiceInfo({ senderInfos, recipientInfos, legalInfos, isUserIndividual }: InvoiceInfoProps) {
  const [recipientStreetAddress, ...recipientRestAdress] = recipientInfos.address.split(/,(.+)/);
  return (
    <View style={{ ...invoiceStyles.section, ...invoiceStyles.flexRow }}>
      <View style={invoiceStyles.flexCol}>
        <View style={invoiceStyles.paddingRightSmall}>
          <Text style={invoiceStyles.h4}>
            {isUserIndividual ? InvoiceTokens.invoiceInfos.individualName : InvoiceTokens.invoiceInfos.companyName}
          </Text>
          <Text style={invoiceStyles.paragraph}>{senderInfos.name}</Text>
          <Text style={{ ...invoiceStyles.paragraph, maxWidth: "350px" }}>{senderInfos.address}</Text>
          {senderInfos.euVATNumber ? (
            <Text style={invoiceStyles.paragraph}>
              {InvoiceTokens.invoiceInfos.vatNumber}: {senderInfos.euVATNumber}
            </Text>
          ) : null}
        </View>
        <View
          style={{ ...invoiceStyles.paddingLeftSmall, ...invoiceStyles.justifyContentEnd, ...invoiceStyles.textRight }}
        >
          <Text style={invoiceStyles.h4}>{InvoiceTokens.invoiceInfos.billedTo}</Text>
          <Text style={invoiceStyles.paragraph}>{recipientInfos.name}</Text>
          <Text style={invoiceStyles.paragraph}>{recipientStreetAddress}</Text>
          <Text style={invoiceStyles.paragraph}>{recipientRestAdress.join("").trim()}</Text>
          <Text style={invoiceStyles.paragraph}>
            {InvoiceTokens.invoiceInfos.siren}: {recipientInfos.registrationNumber}
          </Text>
          <Text style={invoiceStyles.paragraph}>
            {InvoiceTokens.invoiceInfos.vatNumber}: {recipientInfos.euVATNumber}
          </Text>
        </View>
      </View>
      <View style={invoiceStyles.flexCol}>
        <View style={invoiceStyles.paddingRightSmall}>
          <Text style={invoiceStyles.h4}>{InvoiceTokens.invoiceInfos.issueDate}</Text>
          <Text style={invoiceStyles.paragraph}>{legalInfos.generationDate}</Text>
        </View>
        <View
          style={{
            ...invoiceStyles.paddingLeftSmall,
            ...invoiceStyles.justifyContentEnd,
            ...invoiceStyles.textRight,
            ...invoiceStyles.width100p,
          }}
        >
          <Text style={invoiceStyles.h4}>{InvoiceTokens.invoiceInfos.dueDate}</Text>
          <Text style={invoiceStyles.paragraph}>{legalInfos.dueDate}</Text>
        </View>
      </View>
      <View style={invoiceStyles.flexRow} wrap={false}>
        <Text style={invoiceStyles.h4}>{InvoiceTokens.invoiceInfos.destinationAccounts}</Text>
        {legalInfos.destinationAccounts.map((account, index) => (
          <Text key={index} style={{ ...invoiceStyles.paragraph, fontSize: 11, lineHeight: 1.2 }}>
            - {account}
          </Text>
        ))}
      </View>
    </View>
  );
}
