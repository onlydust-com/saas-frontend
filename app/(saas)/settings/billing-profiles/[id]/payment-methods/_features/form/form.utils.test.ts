import { describe, expect, it } from "vitest";

import { BillingProfilePayoutInfoInterface } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";

import { PayoutFormData } from "./form.types";
import { formatToData, formatToSchema } from "./form.utils";

describe("formatToData", () => {
  it("should format payout info correctly with full data", () => {
    const mockData: BillingProfilePayoutInfoInterface = {
      ethWallet: "0x123",
      starknetAddress: "0x456",
      optimismAddress: "0x789",
      aptosAddress: "0xabc",
      stellarAccountId: "GDEF4",
      nearAccountId: "GDEF5",
      bankAccount: {
        number: "DE89 3704 0044 0532 0130 00",
        bic: "COLSDE33",
      },
    };

    const expectedData: PayoutFormData = {
      ethWallet: "0x123",
      starknetAddress: "0x456",
      optimismAddress: "0x789",
      aptosAddress: "0xabc",
      stellarAccountId: "GDEF4",
      nearAccountId: "GDEF5",
      bankAccount: {
        number: "DE89 3704 0044 0532 0130 00",
        bic: "COLSDE33",
      },
    };

    const result = formatToData(mockData);
    expect(result).toEqual(expectedData);
  });

  it("should format payout info correctly with partial data", () => {
    const mockData: BillingProfilePayoutInfoInterface = {
      ethWallet: "0x123",
    };

    const expectedData: PayoutFormData = {
      ethWallet: "0x123",
      starknetAddress: "",
      optimismAddress: "",
      aptosAddress: "",
      stellarAccountId: "",
      nearAccountId: "",
      bankAccount: {
        number: "",
        bic: "",
      },
    };

    const result = formatToData(mockData);
    expect(result).toEqual(expectedData);
  });
});

describe("formatToSchema", () => {
  it("should convert formatted data to schema correctly with full data", () => {
    const formattedData: PayoutFormData = {
      ethWallet: "0x123",
      starknetAddress: "0x456",
      optimismAddress: "0x789",
      aptosAddress: "0xabc",
      stellarAccountId: "GDEF4",
      nearAccountId: "GDEF5",
      bankAccount: {
        number: "DE89 3704 0044 0532 0130 00",
        bic: "COLSDE33",
      },
    };

    const expectedSchema = {
      ethWallet: "0x123",
      starknetAddress: "0x456",
      optimismAddress: "0x789",
      aptosAddress: "0xabc",
      stellarAccountId: "GDEF4",
      nearAccountId: "GDEF5",
      bankAccount: {
        number: "DE89 3704 0044 0532 0130 00",
        bic: "COLSDE33",
      },
    };

    const result = formatToSchema(formattedData);
    expect(result).toEqual(expectedSchema);
  });

  it("should convert formatted data to schema correctly with partial data", () => {
    const formattedData: PayoutFormData = {
      ethWallet: "0x123",
      starknetAddress: "",
      optimismAddress: "",
      aptosAddress: "",
      stellarAccountId: "",
      nearAccountId: "",
      bankAccount: {
        number: "",
        bic: "",
      },
    };

    const expectedSchema = {
      ethWallet: "0x123",
      starknetAddress: undefined,
      optimismAddress: undefined,
      aptosAddress: undefined,
      stellarAccountId: undefined,
      nearAccountId: undefined,
    };

    const result = formatToSchema(formattedData);
    expect(result).toEqual(expectedSchema);
  });
});
