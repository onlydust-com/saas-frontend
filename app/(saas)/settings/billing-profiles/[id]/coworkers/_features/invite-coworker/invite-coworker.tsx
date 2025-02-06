"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";

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
        <Button>Invite team member</Button>
      </SheetTrigger>
      <SheetContent>
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
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={BillingProfileRole.Admin} id="admin" />
                        <FormLabel htmlFor="admin">Admin</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={BillingProfileRole.Member} id="member" />
                        <FormLabel htmlFor="member">Member</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Inviting..." : "Invite"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
