import { Check, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

export function ProfileInvitationBanner({ id }: { id: string }) {
  const router = useRouter();

  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const { mutate, isPending } = BillingProfileReactQueryAdapter.client.useAcceptOrRejectCoworkerInvitation({
    pathParams: {
      billingProfileId: id,
    },
    options: {
      onSuccess: (_, variables) => {
        if (variables.accepted) {
          toast.success(`You joined ${data?.name} successfully.`);
        } else {
          router.push(NEXT_ROUTER.settings.billingProfiles.root);
          toast.error(`You declined the invitation to ${data?.name}.`);
        }
      },
      onError: () => {
        toast.error(`An error occurred while responding to the invitation to ${data?.name}.`);
      },
    },
  });

  function handleAccept() {
    mutate({
      accepted: true,
    });
  }

  function handleDecline() {
    mutate({
      accepted: false,
    });
  }

  if (!data) return null;

  if (data.isInvited() && !data.hasRole()) {
    return (
      <Alert>
        <Sparkles className="h-4 w-4" />

        <AlertTitle>You’ve been invited to the {data.name} payout profile.</AlertTitle>

        <div className="flex flex-col gap-3">
          <AlertDescription>Please only accept if you are a member of this company.</AlertDescription>

          <div className="flex gap-3">
            <Button size="sm" onClick={handleAccept} loading={isPending}>
              <Check className="h-4 w-4" />
              Accept
            </Button>

            <Button variant="destructive" size="sm" onClick={handleDecline} loading={isPending}>
              <X className="h-4 w-4" />
              Decline
            </Button>
          </div>
        </div>
      </Alert>
    );
  }

  return null;
}
