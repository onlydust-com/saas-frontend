import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { fetchInvoicePreviewBlob } from "@/shared/features/invoice/handlers/fetch-invoice-preview-blob";
import { UseInvoicePreviewProps } from "@/shared/features/invoice/hooks/use-invoice-preview/use-invoice-preview.types";

export function useInvoicePreview({ rewardIds, billingProfileId, isSample = false }: UseInvoicePreviewProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fileBlob, setFileBlob] = useState<Blob>();
  const [fileUrl, setFileUrl] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const { getHeaders } = useClientBootstrapImpersonation();

  const fetched = useRef(false);

  useEffect(() => {
    if (rewardIds && billingProfileId && !fetched.current) {
      handleInvoiceCreation();
    }
  }, []);

  async function handleInvoiceCreation() {
    fetched.current = true;
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const data = await fetchInvoicePreviewBlob({
        token,
        rewardIds,
        billingProfileId,
        isSample,
        impersonationHeaders: getHeaders(),
      });
      if (data?.blob) {
        setFileBlob(data.blob);
        setFileUrl(window.URL.createObjectURL(data.blob));
        setInvoiceId(data.invoiceId ?? "");
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, isError, fileBlob, fileUrl, invoiceId };
}
