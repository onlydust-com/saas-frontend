import { z } from "zod";

import { UpdateDepositBody } from "@/core/domain/deposit/deposit-contract.types";
import { OnlyDustWallet } from "@/core/kernel/money/money.types";

export interface DepositSummarySidepanelData {
  sponsorId: string;
  network: NonNullable<OnlyDustWallet["network"]>;
  transactionReference: string;
}

export type DepositSummaryFormValues = UpdateDepositBody;

export const depositSummaryFormValidation = z.object({
  billingInformation: z
    .object({
      companyName: z.string().optional(),
      companyAddress: z.string().optional(),
      companyCountry: z.string().optional(),
      companyId: z.string().optional(),
      vatNumber: z.string().optional(),
      billingEmail: z.string().email().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
});
