"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { Alert, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyMuted } from "@/shared/ui/typography";

import { InviteCoworkerProps, inviteCoworkerSchema } from "./invite-coworker.types";

type InviteCoworkerFormData = z.infer<typeof inviteCoworkerSchema>;

export function InviteCoworker({ id }: InviteCoworkerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<InviteCoworkerFormData>({
    resolver: zodResolver(inviteCoworkerSchema),
  });

  const { mutate, isPending } = BillingProfileReactQueryAdapter.client.useInviteBillingProfileCoworker({
    pathParams: {
      billingProfileId: id,
    },
    options: {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    },
  });

  function onSubmit(data: InviteCoworkerFormData) {
    mutate({ githubUserId: Number(data.githubUserId), role: data.role });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Alert variant="default" className="mb-4">
          <div className="flex items-center justify-between gap-2">
            <AlertTitle className="m-0">
              All your coworkers will be able to allocate rewards to your billing profile.
            </AlertTitle>

            <Button>Invite team member</Button>
          </div>
        </Alert>
      </SheetTrigger>
      <SheetContent className="!min-w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Invite team member</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <FormField
              control={form.control}
              name="githubUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <UserAutocomplete
                      name="githubUserId"
                      selectedUser={field.value ? [field.value] : []}
                      onSelect={ids => field.onChange(ids[0])}
                      isPopover={false}
                      placeholder="Search for a user"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 rounded-md border border-secondary p-4">
                        <RadioGroupItem value={BillingProfileRole.Admin} id={BillingProfileRole.Admin} />
                        <FormLabel htmlFor={BillingProfileRole.Admin} className="flex flex-col gap-2">
                          <Label>Admin</Label>
                          <TypographyMuted>Can modify general information & invite team members.</TypographyMuted>
                        </FormLabel>
                      </div>
                      <div className="flex items-center gap-4 rounded-md border border-secondary p-4">
                        <RadioGroupItem value={BillingProfileRole.Member} id={BillingProfileRole.Member} />
                        <FormLabel htmlFor={BillingProfileRole.Member} className="flex flex-col gap-2">
                          <Label>Member</Label>
                          <TypographyMuted>Can allocate their rewards to this billing profile.</TypographyMuted>
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" loading={isPending}>
                Invite
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
