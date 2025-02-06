"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

export function NotificationsForm() {
  const { data } = MeReactQueryAdapter.client.useGetMyProfile({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormItem className="grid items-center justify-between rounded-lg border p-3 shadow-sm md:grid-cols-4">
              <div className="col-span-2 space-y-0.5">
                <FormLabel>Marketing emails</FormLabel>
                <FormDescription>Receive emails about new products, features, and more.</FormDescription>
              </div>

              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch id="marketing_emails" checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor="marketing_emails">Airplane Mode</Label>
                    </div>
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch id="marketing_emails" checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor="marketing_emails">Airplane Mode</Label>
                    </div>
                  </FormControl>
                )}
              />
            </FormItem>
          </div>
        </div>

        <footer className="flex justify-end">
          <Button type="submit">Save</Button>
        </footer>
      </form>
    </Form>
  );
}
