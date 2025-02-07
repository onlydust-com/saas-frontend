import { Ban, CircleCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { NEXT_ROUTER } from "@/shared/constants/router";
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

export function ManageBillingProfile({ id }: { id: string }) {
  const router = useRouter();

  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const actionType = useMemo(() => {
    if (!data?.enabled) {
      return "enable";
    } else if (data?.me.canDelete) {
      return "delete";
    } else {
      return "disable";
    }
  }, [data]);

  const { mutate: deleteBillingProfile, isPending: isPendingDelete } =
    BillingProfileReactQueryAdapter.client.useDeleteBillingProfile({
      pathParams: {
        billingProfileId: id,
      },
      options: {
        onSuccess: () => {
          toast.success("Billing profile deleted successfully.");
          router.push(NEXT_ROUTER.settings.profile.root);
        },
        onError: () => {
          toast.error("An error occurred while deleting the billing profile.");
        },
      },
    });

  const { mutate: enableOrDisableBillingProfile, isPending: isPendingEnable } =
    BillingProfileReactQueryAdapter.client.useEnableBillingProfile({
      pathParams: {
        billingProfileId: id,
      },
      options: {
        onSuccess: (_, variables) => {
          if (variables.enable) {
            toast.success("Billing profile enabled successfully.");
          } else {
            toast.success("Billing profile disabled successfully.");
          }
        },
        onError: (_, variables) => {
          if (variables.enable) {
            toast.error("An error occurred while enabling the billing profile.");
          } else {
            toast.error("An error occurred while disabling the billing profile.");
          }
        },
      },
    });

  const manageMapping = {
    delete: {
      icon: <Trash2 />,
      label: "Delete billing profile",
      action: () => deleteBillingProfile({}),
      variant: "destructive",
      confirmation: "You won’t be able to access this billing profile anymore.",
    },
    disable: {
      icon: <Ban />,
      label: "Disable billing profile",
      action: () => enableOrDisableBillingProfile({ enable: false }),
      variant: "secondary",
      confirmation:
        "You won’t be able to receive rewards on this billing profile. You’ll still be able to enable it later if needed.",
    },
    enable: {
      icon: <CircleCheck />,
      label: "Enable billing profile",
      action: () => enableOrDisableBillingProfile({ enable: true }),
      variant: "default",
      confirmation: "You’ll be able to receive rewards on this billing profile.",
    },
  } as const;

  if (!data || data.isBillingProfileIndividual() || !data.isAdmin()) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={manageMapping[actionType].variant} loading={isPendingDelete || isPendingEnable}>
          {manageMapping[actionType].icon}
          {manageMapping[actionType].label}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{manageMapping[actionType].confirmation}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={manageMapping[actionType].action}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
