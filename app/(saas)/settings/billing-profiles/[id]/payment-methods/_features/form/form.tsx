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
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset, trigger, watch } = form;

  // We need this to trigger in realtime
  useEffect(() => {
    trigger("bankAccount.number");
    trigger("bankAccount.bic");
  }, [watch("bankAccount.number"), watch("bankAccount.bic")]);

  useEffect(() => {
    if (data) {
      reset(formatToData(data));
    }
  }, [data]);

  function onSubmit(values: PayoutFormData) {
    mutate(formatToSchema(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
