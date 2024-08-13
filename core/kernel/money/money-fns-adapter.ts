import { Currency, FormatParams, MoneyFacadePort } from "./money-facade-port";

const USD_CURRENCY: Currency = {
  id: "",
  code: "USD",
  name: "US Dollar",
  logoUrl: "",
  decimals: 2,
};

export const MoneyAdapter: MoneyFacadePort = {
  format: ({
    value,
    currency,
    locale = "en-US",
    showCurrency = true,
    notation = "standard",
    showTilde = false,
  }: FormatParams): string => {
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
  },
  getUSDCurrency: () => USD_CURRENCY,
};
