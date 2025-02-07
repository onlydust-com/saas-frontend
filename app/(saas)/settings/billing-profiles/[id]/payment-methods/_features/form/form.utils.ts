import IBANParser from "iban";

import { BillingProfilePayoutInfoInterface } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";

import { PayoutFormData } from "./form.types";

export function formatToData(data: BillingProfilePayoutInfoInterface): PayoutFormData {
  const { ethWallet, starknetAddress, optimismAddress, aptosAddress, stellarAccountId, bankAccount, nearAccountId } =
    data;

  return {
    ethWallet: ethWallet ?? "",
    starknetAddress: starknetAddress ?? "",
    optimismAddress: optimismAddress ?? "",
    aptosAddress: aptosAddress ?? "",
    stellarAccountId: stellarAccountId ?? "",
    nearAccountId: nearAccountId ?? "",
    bankAccount: {
      number: bankAccount?.number ? IBANParser.printFormat(bankAccount?.number) : "",
      bic: bankAccount?.bic ?? "",
    },
  };
}

export function formatToSchema(data: PayoutFormData) {
  const { ethWallet, starknetAddress, optimismAddress, aptosAddress, stellarAccountId, bankAccount, nearAccountId } =
    data;
  const emptyStringToUndefined = (value?: string) => (value === "" ? undefined : value);
  const number = emptyStringToUndefined(bankAccount?.number);
  const bic = emptyStringToUndefined(bankAccount?.bic);
  return {
    ethWallet: emptyStringToUndefined(ethWallet),
    starknetAddress: emptyStringToUndefined(starknetAddress),
    optimismAddress: emptyStringToUndefined(optimismAddress),
    aptosAddress: emptyStringToUndefined(aptosAddress),
    stellarAccountId: emptyStringToUndefined(stellarAccountId),
    nearAccountId: emptyStringToUndefined(nearAccountId),
    ...(number && bic
      ? {
          bankAccount: {
            number,
            bic,
          },
        }
      : {}),
  };
}
