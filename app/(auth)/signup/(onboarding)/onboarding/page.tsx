"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BreadcrumbItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { LanguagesFilter } from "@/shared/filters/languages-filter/languages-filter";
import { useAuthContext, withAuthenticated } from "@/shared/providers/auth-provider";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Combobox } from "@/shared/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyMuted } from "@/shared/ui/typography";

const formSchema = z.object({
  preferredLanguages: z.array(z.string()),
  preferredProjectMaturity: z.number(),
  preferredDomains: z.string(),
});

function SignupLegalPage() {
  const { redirectToApp } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: postMyOnboardingAnswers, isPending } = MeReactQueryAdapter.client.usePostMyOnboardingAnswers({});

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);

    postMyOnboardingAnswers({
      preferredLanguages: values.preferredLanguages,
      preferredProjectMaturity: values.preferredProjectMaturity,
      preferredDomains: values.preferredDomains,
    });

    // redirectToApp();
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b-1 p-6 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Signup</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Onboarding</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <TypographyMuted className="pt-2">Complete your profile to have a better recommendation</TypographyMuted>
      </CardHeader>

      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 space-y-4">
            <FormField
              control={form.control}
              name="preferredLanguages"
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <FormItem className="flex flex-col justify-start gap-3">
                    <FormLabel>Select your preferred languages</FormLabel>
                    <FormControl>
                      <LanguagesFilter fullWidth onSelect={field.onChange} languagesIds={field.value} />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="preferredProjectMaturity"
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <FormItem className="flex flex-col justify-start gap-3">
                    <FormLabel>Do you prefer to work on</FormLabel>
                    <FormControl>
                      <Combobox
                        fullWidth
                        selectionMode="single"
                        closeOnSelect
                        options={[
                          {
                            value: "1",
                            label: "Well established projects",
                            keywords: ["popular"],
                          },
                          {
                            value: "2",
                            label: "Emerging projects",
                            keywords: ["unknown"],
                          },
                          {
                            value: "0",
                            label: "Doesnt matter",
                            keywords: ["doesnt_matter"],
                          },
                        ]}
                        value={field.value ? [field.value?.toString()] : []}
                        onChange={value => {
                          if (value[0]) {
                            field.onChange(parseInt(value[0]));
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                        selectedLabel=""
                        placeholder="Select your preferred project type"
                      />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="preferredDomains"
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <FormItem className="flex flex-col justify-start gap-3">
                    <FormLabel>Any domains you&apos;d like to work on ?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. AI, DeFi, fintech, gaming, education, security, real estate.."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </div>
              )}
            />
            <div className="flex flex-row justify-between gap-4">
              <Button variant="outline" className="w-full">
                Skip
              </Button>
              <Button type="submit" className="w-full">
                Save preferences
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default withAuthenticated(SignupLegalPage);
