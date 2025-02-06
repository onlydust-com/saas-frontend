import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { UpdateCoworkerRoleProps } from "./update-coworker-role.types";

export function UpdateCoworkerRole({ billingProfileId, githubUserId, currentRole }: UpdateCoworkerRoleProps) {
  const { mutate: updateCoworkerRole, isPending: isUpdatingCoworkerRole } =
    BillingProfileReactQueryAdapter.client.useUpdateBillingProfileCoworkerRole({
      pathParams: { billingProfileId, githubUserId },
      options: {
        onSuccess: () => {
          toast.success("Coworker role updated successfully");
        },
        onError: () => {
          toast.error("Failed to update coworker role");
        },
      },
    });

  return <div>UpdateCoworkerRole</div>;
}
