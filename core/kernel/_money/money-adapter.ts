import { Currency } from "@/core/kernel/money/money.types";

import { MoneyFacadePort } from "./money-facade-port";

interface IMoneyClassFormat {
  amount?: number | null;
  currency?: Currency;
  options?: {
    showCurrency?: boolean;
    locale?: string;
    currencyClassName?: string;
    prefixAmountWithTilde?: boolean;
    notation?: "standard" | "scientific" | "engineering" | "compact";
  };
}

export class MoneyAdapter implements MoneyFacadePort {
  private codeMapping = {
    FIAT: ["USD", "EUR"],
  };

  isFiat(currency?: Currency) {
    if (!currency) return false;

    return this.codeMapping.FIAT.includes(currency.code);
  }

  private withCurrency(str: string, code: string, showCurrency: boolean) {
    return showCurrency ? `${str} ${code}` : str;
  }

  private withTilde(str: string, prefixAmountWithTilde: boolean) {
    return prefixAmountWithTilde ? `~${str}` : str;
  }

  private getAmount(
    amount: number,
    currency: Currency,
    options: Intl.NumberFormatOptions = {},
    locale: Intl.LocalesArgument = "en-US"
  ) {
    const { notation } = options;

    // Need this to have fixed decimal places for compact notation
    const maximumFractionDigits = notation === "compact" ? 1 : currency?.decimals;

    return new Intl.NumberFormat(locale, {
      maximumFractionDigits,
      notation,
    })
      .format(amount)
      .toLowerCase();
  }

  private toHtml({
    amount,
    currency,
    options,
  }: {
    amount: string;
    currency: Currency;
    options: IMoneyClassFormat["options"];
  }) {
    const { showCurrency = true, currencyClassName, prefixAmountWithTilde = false } = options || {};
    // return (
    //   <span>
    //     {this.withTilde(amount, prefixAmountWithTilde)}
    // {showCurrency ? <span className={currencyClassName}>&nbsp;{currency.code}</span> : null}
    // </span>
    // );
  }

  private toString({
    amount,
    currency,
    options,
  }: {
    amount: string;
    currency: Currency;
    options: IMoneyClassFormat["options"];
  }) {
    const { showCurrency = true, prefixAmountWithTilde = false } = options || {};
    return this.withCurrency(this.withTilde(amount, prefixAmountWithTilde), currency.code, showCurrency);
  }

  format({ amount, currency, options }: IMoneyClassFormat) {
    if (amount === null || amount === undefined || !currency) {
      return {
        string: "N/A",
        // html: <span>N/A</span>,
      };
    }

    const formattedNumber = this.getAmount(amount, currency, options);

    return {
      string: this.toString({ amount: formattedNumber, currency, options }),
      html: this.toHtml({ amount: formattedNumber, currency, options }),
    };
  }
}
