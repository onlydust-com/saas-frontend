"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { PayoutFormData, formSchema } from "./form.types";
import { formatToData, formatToSchema } from "./form.utils";

export function PaymentMethodForm({ id }: { id: string }) {
  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfilePayoutInfoById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const { mutate, isPending } = BillingProfileReactQueryAdapter.client.useUpdateBillingProfilePayoutInfo({
    pathParams: {
      billingProfileId: id,
    },
    options: {
      onSuccess: () => {
        toast.success("Payment methods updated successfully");
      },
      onError: () => {
        toast.error("Failed to update payment methods");
      },
    },
  });

  const form = useForm<PayoutFormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset, trigger, watch, setError } = form;

  // We need this to trigger in realtime
  useEffect(() => {
    trigger("bankAccount.number");
    trigger("bankAccount.bic");
  }, [watch("bankAccount.number"), watch("bankAccount.bic")]);

  useEffect(() => {
    if (data) {
      reset(formatToData(data));

      if (data.missingEthWallet) {
        setError("ethWallet", { message: "Ethereum wallet address is missing." });
      }

      if (data.missingStarknetWallet) {
        setError("starknetAddress", { message: "Starknet wallet address is missing." });
      }

      if (data.missingOptimismWallet) {
        setError("optimismAddress", { message: "Optimism wallet address is missing." });
      }

      if (data.missingAptosWallet) {
        setError("aptosAddress", { message: "Aptos wallet address is missing." });
      }

      if (data.missingStellarWallet) {
        setError("stellarAccountId", { message: "Stellar wallet address is missing." });
      }

      if (data.missingNearWallet) {
        setError("nearAccountId", { message: "Near wallet address is missing." });
      }

      if (data.missingBankAccount) {
        setError("bankAccount.number", { message: "Bank account number is missing." });
        setError("bankAccount.bic", { message: "BIC / SWIFT is missing." });
      }
    }
  }, [data]);

  function onSubmit(values: PayoutFormData) {
    mutate(formatToSchema(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="ethWallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ethereum wallet address or ENS name</FormLabel>
              <FormControl>
                <Input placeholder="Ethereum wallet address" {...field} />
              </FormControl>
              <FormDescription>Relevant for rewards in USD Coin, Ethereum, Starknet, Lords.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="starknetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starknet wallet address</FormLabel>
              <FormControl>
                <Input placeholder="Starknet wallet address" {...field} />
              </FormControl>
              <FormDescription>Relevant for rewards in USD Coin, Ethereum, Starknet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="optimismAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optimism wallet address</FormLabel>
              <FormControl>
                <Input placeholder="Optimism wallet address" {...field} />
              </FormControl>
              <FormDescription>Relevant for rewards in USD Coin, Optimism, Worldcoin.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aptosAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aptos wallet address</FormLabel>
              <FormControl>
                <Input placeholder="Aptos wallet address" {...field} />
              </FormControl>
              <FormDescription>Relevant for rewards in Aptos.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stellarAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stellar wallet address</FormLabel>
              <FormControl>
                <Input placeholder="Stellar wallet address" {...field} />
              </FormControl>
              <FormDescription>Relevant for rewards in USD Coin, Stellar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nearAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Near wallet address</FormLabel>
              <FormControl>
                <Input placeholder="Near wallet address" {...field} />
              </FormControl>
              <FormDescription>Relevant for rewards in Near.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="bankAccount.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account number</FormLabel>
                <FormControl>
                  <Input placeholder="Account number" {...field} />
                </FormControl>
                <FormDescription>Relevant for rewards in US Dollar.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankAccount.bic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BIC / SWIFT</FormLabel>
                <FormControl>
                  <Input placeholder="BIC / SWIFT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <footer className="col-span-full flex justify-end">
          <Button type="submit" loading={isPending} disabled={!form.formState.isDirty || !form.formState.isValid}>
            Save changes
          </Button>
        </footer>
      </form>
    </Form>
  );
}
