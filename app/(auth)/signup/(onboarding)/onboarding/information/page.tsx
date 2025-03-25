"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BreadcrumbItem } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { REGEX } from "@/app/(saas)/settings/profile/_components/form/form.utils";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { NEXT_ROUTER } from "@/shared/constants/router";
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
import { Input } from "@/shared/ui/input";
import { TypographyMuted } from "@/shared/ui/typography";

const formSchema = z.object({
  telegram: z
    .object({
      contact: z.string().regex(REGEX.telegram, "invalid telegram username").optional().or(z.literal("")),
      isPublic: z.boolean(),
    })
    .nullable()
    .optional(),
});

function SignupOnboardingPage() {
  const router = useRouter();

  const isForcedOnboarding = useForcedOnboarding();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telegram: {
        contact: "",
        isPublic: false,
      },
    },
  });

  const { mutateAsync: setMe, isPending: isPendingMe } = MeReactQueryAdapter.client.useSetMe({});
  const { mutateAsync: setMyProfile, isPending: isPending } = MeReactQueryAdapter.client.useSetMyProfile({});
  const { data: profile } = MeReactQueryAdapter.client.useGetMyProfile({});

  function redirectToNextStepOrDiscover() {
    if (isForcedOnboarding) {
      router.push(NEXT_ROUTER.signup.onboarding.recommendation.root);
      return;
    }
    router.push(NEXT_ROUTER.discover.root);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.telegram?.contact && profile) {
      await setMyProfile({
        contacts: [
          ...(profile.body.contacts ?? []),
          {
            channel: "TELEGRAM",
            contact: values.telegram.contact ?? "",
            visibility: values.telegram.isPublic ? "public" : "private",
          },
        ],
      });
    }

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
                name="telegram.contact"
                render={({ field }) => (
                  <div className="flex flex-col space-y-2">
                    <FormItem className="flex flex-col justify-start gap-3">
                      <FormLabel>Telegram</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input placeholder="Enter your telegram handle" {...field} />
                          <FormField
                            control={form.control}
                            name="telegram.isPublic"
                            render={({ field: { value, onChange } }) => (
                              <Button type="button" variant="ghost" size="icon" onClick={() => onChange(!value)}>
                                {value ? <Eye /> : <EyeOff />}
                              </Button>
                            )}
                          />
                        </div>
                      </FormControl>
                    </FormItem>

                    <FormMessage />
                  </div>
                )}
              />

              <div className="flex flex-row justify-between gap-4">
                <Button type="submit" className="w-full" loading={isPending || isPendingMe}>
                  Save my information
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
