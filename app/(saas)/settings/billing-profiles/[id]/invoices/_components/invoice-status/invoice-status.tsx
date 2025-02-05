import { Ban, CheckCheck, LoaderCircle, Pencil } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";

import { InvoiceStatusProps } from "./invoice-status.types";

export function InvoiceStatus({ status }: InvoiceStatusProps) {
  const statusIcons = {
    COMPLETE: <Icon component={CheckCheck} />,
    DRAFT: <Icon component={Pencil} />,
    PROCESSING: <Icon component={LoaderCircle} />,
    REJECTED: <Icon component={Ban} />,
  };

  const statusText = {
    COMPLETE: "Approved",
    DRAFT: "Draft",
    PROCESSING: "Processing",
    REJECTED: "Rejected",
  };

  if (status) {
    return (
      <div className="flex items-center gap-2">
        {statusIcons[status]}
        <span>{statusText[status]}</span>
      </div>
    );
  }

  return null;
}
