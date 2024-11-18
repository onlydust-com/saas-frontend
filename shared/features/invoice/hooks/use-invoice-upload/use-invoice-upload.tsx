import { useState } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { toast } from "@/design-system/molecules/toaster";

import {
  HandleSendInvoiceProps,
  UseInvoiceUploadProps,
} from "@/shared/features/invoice/hooks/use-invoice-upload/use-invoice-upload.types";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Translate } from "@/shared/translation/components/translate/translate";

export function useInvoiceUpload({ billingProfileId, invoiceId }: UseInvoiceUploadProps) {
  const { capture } = usePosthog();
  const { close } = useSidePanelsContext();

  const [queryParams, setQueryParams] = useState({});

  const { mutate: uploadInvoice, isPending: isPendingUploadInvoice } =
    BillingProfileReactQueryAdapter.client.useUploadBillingProfileInvoiceById({
      pathParams: {
        billingProfileId,
        invoiceId,
      },
      queryParams,
      options: {
        onSuccess: () => {
          toast.success(<Translate token={"features:invoices.invoiceSubmission.toaster.success"} />);
          close();
        },
        onError: () => {
          toast.error(<Translate token={"features:invoices.invoiceSubmission.toaster.error"} />);
        },
      },
    });

  function handleSendInvoice({ fileBlob, isManualUpload = false, fileName }: HandleSendInvoiceProps) {
    if (isManualUpload && fileName) {
      const params = new URLSearchParams();
      params.append("fileName", fileName);
      setQueryParams({ fileName });
    }
    if (fileBlob) {
      uploadInvoice(fileBlob);
      capture("invoice_submitted", { type: isManualUpload ? "manual" : "auto-generated" });
    } else {
      toast.error(<Translate token="features:invoices.invoiceSubmission.toaster.emptyFile" />);
    }
  }

  return { isPendingUploadInvoice, handleSendInvoice };
}
