"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { LanguagesFilter } from "@/shared/filters/languages-filter/languages-filter";
import { useForcedOnboarding } from "@/shared/hooks/flags/use-forced-onboarding";
import { withAuthenticated, withOnboarding } from "@/shared/providers/auth-provider";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { TypographyMuted } from "@/shared/ui/typography";

const formSchema = z.object({
  preferredLanguages: z.array(z.string()),
  preferredProjectMaturity: z.number(),
  preferredDomains: z.string(),
});

function SignupOnboardingPage() {
  const router = useRouter();

  const isForcedOnboarding = useForcedOnboarding();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: postMyOnboardingAnswers, isPending } = MeReactQueryAdapter.client.usePostMyOnboardingAnswers({});
  const { mutateAsync: setMe, isPending: isPendingMe } = MeReactQueryAdapter.client.useSetMe({});

  function redirectToNextStepOrDiscover() {
    if (isForcedOnboarding) {
      router.push(NEXT_ROUTER.signup.onboarding.recommendation.root);
      return;
    }
    router.push(NEXT_ROUTER.discover.root);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("vlues", values);

    if (!isForcedOnboarding) {
      // update the /me
      await setMe({
        hasCompletedOnboarding: true,
      });
    }

    redirectToNextStepOrDiscover();
  }

  return (
    <>
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Information</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <TypographyMuted className="pt-2">Provide general information to enhance your experience.</TypographyMuted>
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

              <div className="flex flex-row justify-between gap-4">
                <Button type="submit" className="w-full" loading={isPending || isPendingMe}>
                  Save preferences
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default withAuthenticated(withOnboarding(SignupOnboardingPage));
