import { CircleAlert, CircleCheck } from "lucide-react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Badge } from "@/shared/ui/badge";

export function ProfileStatus({ id }: { id: string }) {
  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  const status = data?.getStatus();

  const statusMap = {
    error: {
      icon: <CircleAlert className="size-4" />,
      variant: "destructive",
    },
    warning: {
      icon: <CircleAlert className="size-4" />,
      variant: "secondary",
    },
    success: {
      icon: <CircleCheck className="size-4" />,
      variant: "default",
    },
  } as const;

  if (!status) {
    return null;
  }

  return (
    <Badge variant={statusMap[status.type].variant} className="inline-flex w-fit items-center gap-0.5">
      {statusMap[status.type].icon}
      {status.label}
    </Badge>
  );
}
