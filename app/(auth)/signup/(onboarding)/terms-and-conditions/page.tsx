"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { bootstrap } from "@/core/bootstrap";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

const formSchema = z.object({
  terms: z
    .boolean()
    .default(false)
    .refine(data => data, {
      message: "You must accept the terms & conditions to continue.",
    }),
});

function SignupLegalPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <ScrollArea className="h-[440px]">
            <div className="space-y-3 p-3">
              <TypographyH4>What&apos;s OnlyDust?</TypographyH4>

              <TypographyP className="text-sm">
                OnlyDust is a platform provided by Wagmi SAS designed to optimize the financing of open source projects
                using blockchain protocols. On behalf of foundations supporting the development of protocols, we
                organize connections between open source projects and developers and organize the funding of the
                latter&apos;s contributions.
              </TypographyP>

              <TypographyH4>How to access OnlyDust?</TypographyH4>

              <TypographyP className="text-sm">
                To use our platform, you must be of legal age (+ 16 years), not be a sanctioned person, and, of course,
                accept and observe the T&Cs in full. To obtain your rewards, you will need to comply with KYC/KYB
                requirements.
              </TypographyP>

              <TypographyH4>What are your responsibilities?</TypographyH4>

              <TypographyP className="text-sm">
                You can use the platform as a project leader or as a contributor.
                <br />
                <br />
                <u>If you are a contributor</u>, you will provide contributions from among those proposed on the
                platform by the projects. You undertake to execute these contributions with the highest level of
                diligence, in accordance with the specifications set out by the project. Rewards for this contribution
                will not be systematic and will depend in part on how well the contribution is executed. This evaluation
                will be carried out by the project leader and, except in cases of fraud, Only Dust will not be directly
                involved.
                <br />
                <br />
                <u>If you are a Project Leader</u>, the project must be open-source and useful for the community. You
                will be responsible for the project, and as such, you will have to define the nature of the
                contributions required, assess their quality and determine the reward amount to be paid to contributors.
                You can receive a grant depending on the merits of your project, which is purely discretionary (will be
                taken by OD or by a committee of independent experts)
                <br />
                <br />
                <u>In both cases, you must</u>: (i) properly use our platform and refrain from all fraudulent activity;
                (ii) give us valid information about your status, including whether you act for a company or not; (iii)
                comply with platform and refrain from all fraudulent activity; (ii) give us valid information about your
                status, including whether you act for a company or not; (iii) comply with the laws and regulations in
                force in the country in which you are locateds.
                <br />
                <br />
                What are Our responsibilities? We undertake to provide you with our platform and ensure its proper
                operation and transfer to contributors the rewards under the conditions defined by the project leader.
                <br />
                <br />
                By using Our platform, You understand that we are not responsible for the interruption or breakdowns of
                our platform; we are not your employer and the rewards that we transfer to you must not be considered as
                a salary; we are not responsible for the amount of budget that is given to a project nor for the amount
                of rewards that is given to contributors; and we are not responsible if the foundations decide not to
                give us funds anymore.
              </TypographyP>
            </div>
          </ScrollArea>
        </Card>

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
        <Button type="submit" className="w-full" variant="secondary">
          Next step
        </Button>
      </form>
    </Form>
  );
}

export default withClientOnly(withAuthenticated(SignupLegalPage));
