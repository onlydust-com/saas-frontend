import { DoorOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

export function LeaveBillingProfile({ id }: { id: string }) {
  const router = useRouter();
  const { githubUserId = 0 } = useAuthUser();

  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const { mutate, isPending } = BillingProfileReactQueryAdapter.client.useRemoveCoworkerFromBillingProfile({
    pathParams: {
      billingProfileId: id,
      githubUserId,
    },
    options: {
      onSuccess: () => {
        toast.success("You left the billing profile successfully.");
        router.push(NEXT_ROUTER.settings.profile.root);
      },
      onError: () => {
        toast.error("An error occurred while leaving the billing profile.");
      },
    },
  });

  function onConfirm() {
    mutate({});
  }

  if (!data || !data.me.canLeave) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="secondary" loading={isPending}>
          <DoorOpenIcon />
          Leave billing profile
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You won’t be able to receive rewards on this billing profile anymore.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
