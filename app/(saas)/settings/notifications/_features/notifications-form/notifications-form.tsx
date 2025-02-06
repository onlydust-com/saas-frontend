"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@nextui-org/react";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { MeNotificationCategories } from "@/core/domain/me/models/me.types";

import { Button } from "@/shared/ui/button";
import { Form, FormDescription, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH4, TypographySmall } from "@/shared/ui/typography";

import { FormData, formSchema } from "./notifications-form.types";
import { formatToData } from "./notifications-form.utils";

const groups = [
  {
    title: "Global",
    categories: [
      {
        label: "Billing Profile",
        description: "Manage your billing profile with notifications for document verification and identity checks.",
        name: MeNotificationCategories.GLOBAL_BILLING_PROFILE,
      },
      {
        label: "Marketing",
        description: "Get alerts about upcoming events and community calls by joining the marketing list.",
        name: MeNotificationCategories.GLOBAL_MARKETING,
      },
    ],
  },
  {
    title: "Contributor",
    categories: [
      {
        label: "Project",
        description: "Stay informed about project-related updates, including assigned and available issues.",
        name: MeNotificationCategories.CONTRIBUTOR_PROJECT,
      },
      {
        label: "Reward",
        description: "Receive updates on all stages of your rewards, from receipt to payment.",
        name: MeNotificationCategories.CONTRIBUTOR_REWARD,
      },
      {
        label: "Rewind",
        description: "Be alerted as soon as your rewind is available.",
        name: MeNotificationCategories.CONTRIBUTOR_REWIND,
        omit: "SUMMARY_EMAIL",
      },
    ],
  },
  {
    title: "Maintainer",
    categories: [
      {
        label: "Project x Contributors",
        description: "Receive notifications about new applications and contributions from contributors.",
        name: MeNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR,
      },
      {
        label: "Project x Program",
        description: "Get updates on new grants and committee applications within your programs.",
        name: MeNotificationCategories.MAINTAINER_PROJECT_PROGRAM,
      },
    ],
  },
  {
    title: "Global",
    categories: [
      {
        label: "Transactions",
        description: "Receive notifications about allocations & granted.",
        name: MeNotificationCategories.PROGRAM_LEAD,
      },
    ],
  },
  {
    title: "Sponsors",
    categories: [
      {
        label: "Transactions",
        description: "Receive notifications about deposit & allocations.",
        name: MeNotificationCategories.SPONSOR_LEAD,
      },
    ],
  },
];

export function NotificationsForm() {
  const { data } = MeReactQueryAdapter.client.useGetMyNotificationsSettings({});

  const { mutate } = MeReactQueryAdapter.client.useSetMyNotificationsSettings({
    options: {
      onSuccess: () => {
        toast.success("Notification preferences updated");
      },
      onError: () => {
        toast.error("Failed to update notification preferences");
      },
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset(formatToData(data));
    }
  }, [data]);

  function onSubmit(values: FormData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {groups.map((group, i) => {
          return (
            <Card key={i} className="flex flex-col gap-4 border bg-transparent p-4">
              <header className="grid items-baseline justify-between gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <TypographyH4>{group.title}</TypographyH4>
                </div>

                <div className="hidden justify-end md:flex">
                  <TypographySmall className="text-right">Email Notifications</TypographySmall>
                </div>

                <div className="hidden items-center justify-end gap-2 md:flex">
                  <TypographySmall className="text-right">Weekly Summary Email</TypographySmall>

                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The Weekly Summary Email is a digest that consolidates all notifications into a single email
                        sent every week.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </header>

              {group.categories.map(category => {
                return (
                  <FormItem
                    key={category.name}
                    className="grid grid-cols-2 items-center justify-between gap-6 md:grid-cols-4 md:gap-4"
                  >
                    <div className="col-span-2 space-y-0.5">
                      <FormLabel>{category.label}</FormLabel>
                      <FormDescription>{category.description}</FormDescription>
                    </div>

                    <div className="flex md:justify-end">
                      <FormField
                        control={form.control}
                        name={`${category.name}.EMAIL`}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${category.name}.EMAIL`}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor={`${category.name}.EMAIL`} className="md:hidden">
                              Email Notifications
                            </Label>
                          </div>
                        )}
                      />
                    </div>

                    {category.omit !== "SUMMARY_EMAIL" ? (
                      <div className="flex md:justify-end">
                        <FormField
                          control={form.control}
                          name={`${category.name}.SUMMARY_EMAIL`}
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`${category.name}.SUMMARY_EMAIL`}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label htmlFor={`${category.name}.SUMMARY_EMAIL`} className="md:hidden">
                                Weekly Summary Email
                              </Label>
                            </div>
                          )}
                        />
                      </div>
                    ) : null}
                  </FormItem>
                );
              })}
            </Card>
          );
        })}

        <footer className="flex justify-end">
          <Button type="submit">Save</Button>
        </footer>
      </form>
    </Form>
  );
}
