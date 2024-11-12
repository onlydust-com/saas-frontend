export interface UseInvoiceUploadProps {
  billingProfileId: string;
  invoiceId: string;
}
export interface HandleSendInvoiceProps {
  fileBlob: Blob | undefined;
  isManualUpload?: boolean;
  fileName?: string;
}
