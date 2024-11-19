import { BillingProfilesActions } from "@/core/actions/billing-profiles/billing-profiles.actions";
import { BillingProfileInvoicePreview } from "@/core/domain/billing-profile/models/billing-profile-invoice-preview-model";

export async function fetchInvoicePreviewData({
  token,
  rewardIds,
  billingProfileId,
  impersonationHeaders,
}: {
  token: string | null;
  rewardIds: string;
  billingProfileId: string;
  impersonationHeaders?: string;
}) {
  if (!token) throw new Error("Token is required");
  return await BillingProfilesActions.queries
    .retrieveInvoicePreviewByBillingProfileId(billingProfileId, {
      accessToken: token,
      headers: {
        ...(impersonationHeaders ? { "X-Impersonation-Claims": impersonationHeaders } : {}),
      },
      params: {
        rewardIds,
      },
    })
    .then(res => {
      return new BillingProfileInvoicePreview(res);
    })
    .catch(() => {
      throw new Error("Failed to fetch invoice preview data.");
    });
}
