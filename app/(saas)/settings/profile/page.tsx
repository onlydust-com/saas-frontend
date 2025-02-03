"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { CardContent, CardDescription, CardTitle } from "@/shared/ui/card";
import { CardHeader } from "@/shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { TypographyH3 } from "@/shared/ui/typography";

import { formSchema } from "./_components/form/form.types";
import { GithubAccount } from "./_components/github-account/github-account";

type FormValues = z.infer<typeof formSchema>;

function ProfilePage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactEmail: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <>
      <CardHeader className="p-4">
        <CardTitle>Profile</CardTitle>
        <CardDescription>You can edit all your information here.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 divide-y p-4 pt-0">
        <GithubAccount />
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}

export default withClientOnly(withAuthenticated(ProfilePage));
