"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@nextui-org/react";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SettingsHeader } from "@/app/(saas)/settings/_features/settings-header/settings-header";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { MeNotificationCategory, MeNotificationChannel } from "@/core/domain/me/models/me.types";

import { Button } from "@/shared/ui/button";
import { Form, FormDescription, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH4, TypographySmall } from "@/shared/ui/typography";

import { FormData, formSchema } from "./notifications-form.types";
import { formatToData, formatToSchema } from "./notifications-form.utils";

const groups = [
  {
    title: "Global",
    categories: [
      {
        label: "Billing Profile",
        description: "Manage your billing profile with notifications for document verification and identity checks.",
        name: MeNotificationCategory.GLOBAL_BILLING_PROFILE,
      },
      {
        label: "Marketing",
        description: "Get alerts about upcoming events and community calls by joining the marketing list.",
        name: MeNotificationCategory.GLOBAL_MARKETING,
      },
    ],
  },
  {
    title: "Contributor",
    categories: [
      {
        label: "Project",
        description: "Stay informed about project-related updates, including assigned and available issues.",
        name: MeNotificationCategory.CONTRIBUTOR_PROJECT,
      },
      {
        label: "Reward",
        description: "Receive updates on all stages of your rewards, from receipt to payment.",
        name: MeNotificationCategory.CONTRIBUTOR_REWARD,
      },
      {
        label: "Rewind",
        description: "Be alerted as soon as your rewind is available.",
        name: MeNotificationCategory.CONTRIBUTOR_REWIND,
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
        name: MeNotificationCategory.MAINTAINER_PROJECT_CONTRIBUTOR,
      },
      {
        label: "Project x Program",
        description: "Get updates on new grants and committee applications within your programs.",
        name: MeNotificationCategory.MAINTAINER_PROJECT_PROGRAM,
      },
    ],
  },
  {
    title: "Global",
    categories: [
      {
        label: "Transactions",
        description: "Receive notifications about allocations & granted.",
        name: MeNotificationCategory.PROGRAM_LEAD,
      },
    ],
  },
  {
    title: "Sponsors",
    categories: [
      {
        label: "Transactions",
        description: "Receive notifications about deposit & allocations.",
        name: MeNotificationCategory.SPONSOR_LEAD,
      },
    ],
  },
];

export function NotificationsForm() {
  const { data } = MeReactQueryAdapter.client.useGetMyNotificationsSettings({});

  const { mutate, isPending } = MeReactQueryAdapter.client.useSetMyNotificationsSettings({
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

  const notifications = form.watch("notificationSettings");

  useEffect(() => {
    if (data) {
      form.reset(formatToData(data));
    }
  }, [data]);

  function getAllCategories() {
    if (!notifications) return [];

    return [
      MeNotificationCategory.GLOBAL_BILLING_PROFILE,
      MeNotificationCategory.GLOBAL_MARKETING,
      MeNotificationCategory.CONTRIBUTOR_PROJECT,
      MeNotificationCategory.CONTRIBUTOR_REWARD,
      MeNotificationCategory.MAINTAINER_PROJECT_CONTRIBUTOR,
      MeNotificationCategory.MAINTAINER_PROJECT_PROGRAM,
      MeNotificationCategory.SPONSOR_LEAD,
      MeNotificationCategory.PROGRAM_LEAD,
      MeNotificationCategory.CONTRIBUTOR_REWIND,
    ];
  }

  function isChannelEnabled(channel: MeNotificationChannel) {
    if (!notifications) return false;

    return getAllCategories().every(c => notifications[c]?.[channel]);
  }

  function enableAll(channel: MeNotificationChannel, v: boolean) {
    if (!notifications) return false;

    return getAllCategories().forEach(cat => {
      form.setValue(`notificationSettings.${cat}.${channel}`, v, { shouldDirty: true });
    });
  }

  function onSubmit(values: FormData) {
    mutate(formatToSchema(values));
  }

  return (
    <Form {...form}>
      <div className="grid justify-between gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <SettingsHeader
            title="Notification Preferences"
            description="Customize your notification settings to stay informed about important updates."
          />
        </div>

        <div className="hidden items-center justify-end space-x-2 px-4 md:flex">
          <Label htmlFor={"ENABLE_ALL.EMAIL"}>Enable all</Label>
          <Switch
            id={"ENABLE_ALL.EMAIL"}
            checked={isChannelEnabled(MeNotificationChannel.EMAIL)}
            onCheckedChange={v => enableAll(MeNotificationChannel.EMAIL, v)}
          />
        </div>

        <div className="hidden items-center justify-end space-x-2 px-4 md:flex">
          <Label htmlFor={"ENABLE_ALL.SUMMARY_EMAIL"}>Enable all</Label>
          <Switch
            id={"ENABLE_ALL.SUMMARY_EMAIL"}
            checked={isChannelEnabled(MeNotificationChannel.SUMMARY_EMAIL)}
            onCheckedChange={v => enableAll(MeNotificationChannel.SUMMARY_EMAIL, v)}
          />
        </div>
      </div>

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
                        name={`notificationSettings.${category.name}.EMAIL`}
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
                          name={`notificationSettings.${category.name}.SUMMARY_EMAIL`}
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
          <Button type="submit" loading={isPending}>
            Save
          </Button>
        </footer>
      </form>
    </Form>
  );
}
