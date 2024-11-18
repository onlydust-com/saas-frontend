import apt from "@/public/images/money/currencies/apt.png";
import eth from "@/public/images/money/currencies/eth.png";
import eur from "@/public/images/money/currencies/eur.png";
import lords from "@/public/images/money/currencies/lords.png";
import near from "@/public/images/money/currencies/near.png";
import op from "@/public/images/money/currencies/op.png";
import strk from "@/public/images/money/currencies/strk.png";
import usd from "@/public/images/money/currencies/usd.png";
import usdc from "@/public/images/money/currencies/usdc.png";
import wld from "@/public/images/money/currencies/wld.png";
import xlm from "@/public/images/money/currencies/xlm.png";

import { Currency } from "@/core/kernel/money/money.types";

import { MoneyFacadePort } from "./money-facade-port";

export class MoneyAdapter implements MoneyFacadePort {
  private currencies: Record<Currency["code"], Currency> = {
    APT: {
      code: "APT",
      decimals: 8,
      id: "",
      logoUrl: apt.src,
      name: "Aptos",
    },
    ETH: {
      code: "ETH",
      id: "",
      decimals: 18,
      logoUrl: eth.src,
      name: "Ethereum",
    },
    EUR: {
      code: "EUR",
      id: "",
      decimals: 2,
      logoUrl: eur.src,
      name: "Euro",
    },
    LORDS: {
      code: "LORDS",
      id: "",
      decimals: 18,
      logoUrl: lords.src,
      name: "Lords",
    },
    OP: {
      code: "OP",
      id: "",
      decimals: 18,
      logoUrl: op.src,
      name: "Optimism",
    },
    STRK: {
      code: "STRK",
      id: "",
      decimals: 18,
      logoUrl: strk.src,
      name: "StarkNet Token",
    },
    USD: {
      code: "USD",
      id: "",
      decimals: 2,
      logoUrl: usd.src,
      name: "US Dollar",
    },
    USDC: {
      code: "USDC",
      id: "",
      decimals: 6,
      logoUrl: usdc.src,
      name: "USD Coin",
    },
    WLD: {
      code: "WLD",
      id: "",
      decimals: 18,
      logoUrl: wld.src,
      name: "Worldcoin",
    },
    XLM: {
      code: "XLM",
      id: "",
      decimals: 7,
      logoUrl: xlm.src,
      name: "Stellar",
    },
    NEAR: {
      code: "NEAR",
      id: "",
      decimals: 24,
      logoUrl: near.src,
      name: "Near",
    },
  };

  private currencyCodeMapping = {
    FIAT: ["USD", "EUR"],
  };

  isFiat = (currency?: Currency) => {
    if (!currency) return false;

    return this.currencyCodeMapping.FIAT.includes(currency.code);
  };

  maximumSignificantDigits = 12;

  private formatAmount = ({
    amount,
    decimals = 0,
    options = {},
    locale = "en-US",
  }: {
    amount: number;
    decimals?: number;
    options?: Intl.NumberFormatOptions;
    locale?: Intl.LocalesArgument;
  }) => {
    // Need this to have fixed decimal places for compact notation
    const maximumFractionDigits = options.notation === "compact" ? 1 : decimals;

    return new Intl.NumberFormat(locale, {
      maximumFractionDigits,
      maximumSignificantDigits: this.maximumSignificantDigits,
      ...options,
    })
      .format(amount)
      .toLowerCase();
  };

  format = ({
    amount,
    currency,
    options,
    locale,
    uppercase = false,
  }: {
    amount?: number | null;
    currency?: Currency;
    options?: Intl.NumberFormatOptions;
    locale?: Intl.LocalesArgument;
    uppercase?: boolean;
  }) => {
    if (amount === null || amount === undefined || !currency) {
      return {
        amount: "-",
        code: undefined,
      };
    }

    const formattedAmount = this.formatAmount({ amount, decimals: currency.decimals, options, locale });

    return {
      amount: uppercase ? formattedAmount.toUpperCase() : formattedAmount,
      code: currency.code,
    };
  };

  getCurrency = (code: Currency["code"]) => {
    return this.currencies[code];
  };
}
