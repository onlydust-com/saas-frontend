import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

import { fetchInvoicePreviewBlob } from "@/core/application/invoice-adapter/handlers/fetch-invoice-preview-blob";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

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

  function handleInvoiceData(data: { blob?: Blob; invoiceId?: string | null } | undefined) {
    if (data?.blob) {
      setFileBlob(data.blob);
      setFileUrl(window.URL.createObjectURL(data.blob));
      setInvoiceId(data.invoiceId ?? "");
    } else {
      setIsError(true);
    }
  }

  async function handleInvoiceCreation() {
    fetched.current = true;
    setIsLoading(true);
    setIsError(false);

    try {
      const token = await getAccessTokenSilently();
      const data = await fetchInvoicePreviewBlob({
        token,
        rewardIds,
        billingProfileId,
        isSample,
        impersonationHeaders: getHeaders(),
      });

      handleInvoiceData(data);
    } catch (error) {
      console.error("Failed to create invoice:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, isError, fileBlob, fileUrl, invoiceId };
}
