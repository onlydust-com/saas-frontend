import { useMemo } from "react";
import { toast } from "sonner";

import { CreateBillingProfilePanel } from "@/app/(saas)/settings/billing-profiles/_features/create-billing-profile-panel/create-billing-profile-panel";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";

export function UpdatePayoutPreference({ projectId, defaultValue = "" }: { projectId: string; defaultValue?: string }) {
  const { data, isLoading } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});
  const myBillingProfiles = useMemo(() => data?.billingProfiles ?? [], [data]);

  const { mutate, isPending } = MeReactQueryAdapter.client.useSetMyPreferenceForProject({
    options: {
      onSuccess: () => {
        toast.success("Payout preference updated successfully");
      },
      onError: () => {
        toast.error("Failed to update payout preference");
      },
    },
  });

  const handleRoleChange = (billingProfileId: string) => {
    mutate({ billingProfileId, projectId });
  };

  if (isLoading) {
    return <Skeleton className="h-9 w-32" />;
  }

  if (!data) {
    return (
      <CreateBillingProfilePanel>
        <Button>Create billing profile</Button>
      </CreateBillingProfilePanel>
    );
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleRoleChange} disabled={isPending}>
      <SelectTrigger className="w-fit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {myBillingProfiles.map(billingProfile => (
          <SelectItem key={billingProfile.id} value={billingProfile.id}>
            {billingProfile.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
