import { DoorOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" loading={isPending}>
          <DoorOpenIcon />
          Leave billing profile
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>You won’t be able to receive rewards on this billing profile anymore.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-2 sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={onConfirm}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
