"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BreadcrumbItem } from "@nextui-org/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { bootstrap } from "@/core/bootstrap";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
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
import { Checkbox } from "@/shared/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { TypographyMuted } from "@/shared/ui/typography";

const formSchema = z.object({
  terms: z
    .boolean()
    .default(false)
    .refine(data => data, {
      message: "You must accept the terms & conditions to continue.",
    }),
});

function SignupLegalPage() {
  const { user } = useAuthUser();
  const { redirectToApp } = useAuthContext();

  const hasAcceptedLatestTermsAndConditions = user?.hasAcceptedLatestTermsAndConditions;

  const { mutate: setMe, isPending } = MeReactQueryAdapter.client.useSetMe({
    options: {
      onSuccess: () => {
        toast.success("Terms & conditions accepted");
        redirectToApp();
      },
      onError: () => {
        toast.error("Error accepting terms & conditions");
      },
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });

  useEffect(() => {
    if (hasAcceptedLatestTermsAndConditions) {
      form.setValue("terms", true);
    }
  }, [hasAcceptedLatestTermsAndConditions]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!hasAcceptedLatestTermsAndConditions) {
      setMe({
        hasAcceptedTermsAndConditions: values.terms,
      });
    } else {
      redirectToApp();
    }
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={hasAcceptedLatestTermsAndConditions}
                      />
                    </FormControl>

                    <div className="flex flex-col space-y-1">
                      <FormLabel>I have read and accept terms & conditions</FormLabel>
                      <FormDescription>
                        I agree to the full{" "}
                        <a
                          href={bootstrap.getLegalKernelPort().getTermsAndConditionsUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          terms & conditions
                        </a>{" "}
                        & the{" "}
                        <a
                          href={bootstrap.getLegalKernelPort().getPrivacyPolicyUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          privacy policy
                        </a>
                      </FormDescription>
                    </div>
                  </FormItem>

                  <FormMessage />
                </div>
              )}
            />
            <Button type="submit" className="w-full" loading={isPending}>
              Next step
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default withAuthenticated(SignupLegalPage);
