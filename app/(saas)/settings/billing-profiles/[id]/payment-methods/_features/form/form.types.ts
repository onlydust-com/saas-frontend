import { z } from "zod";

import { REGEX } from "./form.regex";

export const formSchema = z
  .object({
    ethWallet: z
      .union([z.string().regex(REGEX.ethWallet, "Invalid Ethereum wallet address or ENS name"), z.string().length(0)])
      .optional(),
    starknetAddress: z
      .union([z.string().regex(REGEX.starknetAddress, "Invalid Starknet wallet address"), z.string().length(0)])
      .optional(),
    optimismAddress: z
      .union([z.string().regex(REGEX.optimismAddress, "Invalid Optimism wallet address"), z.string().length(0)])
      .optional(),
    aptosAddress: z
      .union([z.string().regex(REGEX.aptosAddress, "Invalid Aptos wallet address"), z.string().length(0)])
      .optional(),
    stellarAccountId: z
      .union([z.string().regex(REGEX.stellarAccountId, "Invalid Stellar wallet address"), z.string().length(0)])
      .optional(),
    nearAccountId: z.string().optional(),
    bankAccount: z.object({
      number: z.string().optional(),
      bic: z.string().optional(),
    }),
  })
  .superRefine(({ bankAccount }, context) => {
    const { number, bic } = bankAccount;
    if ((number && !bic) || (!number && bic)) {
      if (!number) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "IBAN is required when BIC is provided",
          path: ["bankAccount", "number"],
        });
      }
      if (!bic) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "BIC is required when IBAN is provided",
          path: ["bankAccount", "bic"],
        });
      }
    }
  });

export type PayoutFormData = z.infer<typeof formSchema>;
