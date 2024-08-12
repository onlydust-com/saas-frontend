import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

interface FormatCryptoParams {
  value: number;
  currency: components["schemas"]["ShortCurrencyResponse"];
  locale?: string;
  showCurrency?: boolean;
  notation?: "standard" | "scientific" | "engineering" | "compact";
  showTilde?: boolean;
}

export const USD_CURRENCY = {
  id: "",
  code: "USD",
  name: "US Dollar",
  logoUrl: "",
  decimals: 0,
};

export function formatCrypto({
  value,
  currency,
  locale = "en-US",
  showCurrency = true,
  notation = "standard",
  showTilde = false,
}: FormatCryptoParams): string {
  let formattedValue = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
    notation,
  }).format(value);

  if (showTilde) {
    formattedValue = `~${formattedValue}`;
  }

  return showCurrency ? `${formattedValue} ${currency.code}` : formattedValue;
}
