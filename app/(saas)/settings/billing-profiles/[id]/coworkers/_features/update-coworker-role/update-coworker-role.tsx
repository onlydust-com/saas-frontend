import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

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

  const handleRoleChange = (newRole: BillingProfileRole) => {
    updateCoworkerRole({ role: newRole });
  };

  return (
    <Select defaultValue={currentRole} onValueChange={handleRoleChange} disabled={isUpdatingCoworkerRole}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(BillingProfileRole).map(role => (
          <SelectItem key={role} value={role}>
            {role.toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
