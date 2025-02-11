import { Text, View } from "@react-pdf/renderer";

import { bootstrap } from "@/core/bootstrap";

import { InvoiceRewardsSummaryProps } from "@/shared/features/invoice/invoice.types";
import { InvoiceVat } from "@/shared/features/invoice/sections/invoice-vat";
import { InvoiceTokens } from "@/shared/features/invoice/tokens/invoice-tokens";

import { invoiceStyles } from "../styles/invoice.styles";

export function InvoiceSummary({
  isUserIndividual,
  rewards,
  vat,
  totalBeforeTax,
  totalTax,
  totalAfterTax,
  usdToEurConversionRate,
  totalAfterTaxPerCurrency,
}: InvoiceRewardsSummaryProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const idKernelPort = bootstrap.getIdKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  return (
    <View style={invoiceStyles.flexRow}>
      <View style={{ ...invoiceStyles.section, ...invoiceStyles.flexRow, ...invoiceStyles.invoiceCenter }}>
        <Text style={invoiceStyles.h3}>{InvoiceTokens.rewardSummary.title}</Text>
        <View style={invoiceStyles.flexCol}>
          <View style={invoiceStyles.table}>
            <View style={invoiceStyles.tr}>
              <Text style={invoiceStyles.thSmall}>{InvoiceTokens.rewardSummary.table.id}</Text>
              <Text style={invoiceStyles.th}>{InvoiceTokens.rewardSummary.table.project}</Text>
              <Text style={invoiceStyles.th}>{InvoiceTokens.rewardSummary.table.rewardDate}</Text>
              <Text style={invoiceStyles.th}>{InvoiceTokens.rewardSummary.table.amount}</Text>
              <Text style={invoiceStyles.th}>{InvoiceTokens.rewardSummary.table.rate}</Text>
              <Text style={invoiceStyles.th}>{InvoiceTokens.rewardSummary.table.equivalent}</Text>
            </View>
            {rewards?.map((item, index) => (
              <View key={index} style={invoiceStyles.tr} wrap={false}>
                {/*  ID  */}
                <Text style={invoiceStyles.tdSmall}>{`#${idKernelPort.prettyId(item.id)}`}</Text>
                {/*  project name  */}
                <Text style={invoiceStyles.td}>
                  {item.projectName.length > 12 ? `${item.projectName.slice(0, 12)}...` : item.projectName}
                </Text>
                {/*  reward date  */}
                <Text style={invoiceStyles.td}>{dateKernelPort.format(new Date(item.date), "MM/dd/yyyy")}</Text>
                {/*  amount  */}
                <Text style={invoiceStyles.td}>
                  {item.amount.prettyAmount} {item.amount.currency.code}
                </Text>
                {/*  rate  */}
                <View style={{ ...invoiceStyles.td, ...invoiceStyles.flexRow }}>
                  {/*the result should look like this*/}
                  {/*1 ETH ~ 3,000 USD*/}
                  <Text>{`1 ${item.amount.currency.code}`}</Text>
                  <Text>{`=${
                    moneyKernelPort.format({
                      amount: item.amount.target.conversionRate,
                      currency: item.amount.target.currency,
                    }).amount
                  }*`}</Text>
                </View>
                {/*  USD equivalent  */}
                <Text style={invoiceStyles.td}>
                  {
                    moneyKernelPort.format({ amount: item.amount.target.amount, currency: item.amount.target.currency })
                      .amount
                  }
                </Text>
              </View>
            ))}
            <View wrap={false}>
              {/*  For individuals, hide tax lines */}
              {!isUserIndividual ? (
                <View style={invoiceStyles.tr}>
                  <Text style={invoiceStyles.tdSmall}></Text>
                  <Text style={invoiceStyles.th}></Text>
                  <Text style={invoiceStyles.th}></Text>
                  <Text style={invoiceStyles.th}></Text>
                  <Text style={invoiceStyles.th}>{InvoiceTokens.rewardSummary.table.totalBeforeTax}</Text>
                  <Text style={invoiceStyles.th}>
                    {
                      moneyKernelPort.format({ amount: totalBeforeTax, currency: moneyKernelPort.getCurrency("USD") })
                        .amount
                    }
                  </Text>
                </View>
              ) : null}

              {!isUserIndividual ? <InvoiceVat vat={vat} totalTax={totalTax} /> : null}
              <View style={invoiceStyles.tr}>
                <Text style={invoiceStyles.tdSmall}></Text>
                <Text style={invoiceStyles.th}></Text>
                <Text style={invoiceStyles.th}></Text>
                <Text style={invoiceStyles.th}></Text>
                <Text style={invoiceStyles.th}>
                  {!isUserIndividual
                    ? InvoiceTokens.rewardSummary.table.totalAfterTax
                    : InvoiceTokens.rewardSummary.table.totalReceipt}
                </Text>
                <Text style={invoiceStyles.th}>
                  {
                    moneyKernelPort.format({ amount: totalAfterTax, currency: moneyKernelPort.getCurrency("USD") })
                      .amount
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{ ...invoiceStyles.flexRow, ...invoiceStyles.marginTop25P, ...invoiceStyles.paddingHoriz30P }}
        wrap={false}
      >
        <Text style={invoiceStyles.h4}>{InvoiceTokens.rewardSummary.tokenRate.title}</Text>
        <Text style={invoiceStyles.paragraph}>{InvoiceTokens.rewardSummary.tokenRate.descriptionIntro}</Text>
        <Text style={invoiceStyles.paragraph}>{InvoiceTokens.rewardSummary.tokenRate.descriptionOutro}</Text>
      </View>
      <View style={{ ...invoiceStyles.flexRow, ...invoiceStyles.paddingHoriz30P }} wrap={false}>
        <Text style={invoiceStyles.h4}>{InvoiceTokens.rewardSummary.specialMentions}</Text>
        {totalAfterTaxPerCurrency?.map((item, index) => (
          <Text key={index} style={invoiceStyles.paragraph}>
            - {moneyKernelPort.format({ amount: item.amount, currency: item.currency }).amount} {item.currency.code}
            {vat.vatRegulationState === "VAT_APPLICABLE" ? InvoiceTokens.rewardSummary.includingVat : " "}
            {InvoiceTokens.rewardSummary.itemsReceived}
          </Text>
        ))}
        <Text style={invoiceStyles.paragraph}>
          - {InvoiceTokens.rewardSummary.usdToEurConversionRate(usdToEurConversionRate?.toFixed(2))}
        </Text>
      </View>
    </View>
  );
}
