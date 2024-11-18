import { Font, renderToStream } from "@react-pdf/renderer";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  getHeaderProps,
  getInvoiceInfoProps,
  getRewardsSummaryProps,
} from "@/core/application/invoice-adapter/builders/builders";
import { detectLanguageAndGetFontDynamically } from "@/core/application/invoice-adapter/handlers/fetch-font-info";
import { fetchInvoicePreviewData } from "@/core/application/invoice-adapter/handlers/fetch-invoice-preview-data";

import {
  InvoiceHeaderProps,
  InvoiceInfoProps,
  InvoiceRewardsSummaryProps,
} from "@/shared/features/invoice/invoice.types";
import { InvoiceTemplate } from "@/shared/features/invoice/templates/invoice-template";

export async function GET(request: NextRequest) {
  /* ------
  Forward the authorization header to the next endpoint
  ------ */
  const headersList = headers();
  const token = headersList.get("authorization");
  const impersonationHeaders = headersList.get("X-Impersonation-Claims") ?? undefined;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  /* ------
  Retrieve the invoice preview data
  ------ */
  const searchParams = request.nextUrl.searchParams;
  const isSample = searchParams.get("isSample") ?? "false";
  const billingProfileId = searchParams.get("billingProfileId") ?? "";
  const rewardIds = searchParams.get("rewardIds") ?? "";
  let invoicePreviewData;
  try {
    console.log("----> invoicePreviewData");
    invoicePreviewData = await fetchInvoicePreviewData({ token, rewardIds, billingProfileId, impersonationHeaders });
  } catch (e) {
    return new NextResponse("Failed Dependency : Invoice Preview ", { status: 424 });
  }

  /* ------
  Determine the billing profile type
  ------ */
  const isUserIndividual = invoicePreviewData?.isBillingProfileIndividual();

  /* ------
  Build the invoice content
  ------ */
  const header: InvoiceHeaderProps = getHeaderProps({
    isUserIndividual,
    isSample,
    invoiceNumber: invoicePreviewData.number,
  });
  const invoiceInfo: InvoiceInfoProps = getInvoiceInfoProps({
    isUserIndividual,
    invoiceDetails: invoicePreviewData,
  });
  const rewardSummary: InvoiceRewardsSummaryProps = getRewardsSummaryProps({
    isUserIndividual,
    invoiceDetails: invoicePreviewData,
  });
  const footer = {
    invoiceName: isUserIndividual
      ? `${invoicePreviewData.individualBillingProfile?.firstName} ${invoicePreviewData.individualBillingProfile?.lastName}`
      : `${invoicePreviewData.companyBillingProfile?.name}`,
  };

  const languageSample = isUserIndividual
    ? `${invoicePreviewData.individualBillingProfile?.firstName ?? ""} ${
        invoicePreviewData.individualBillingProfile?.lastName ?? ""
      } ${invoicePreviewData.individualBillingProfile?.address ?? ""}`
    : `${invoicePreviewData.companyBillingProfile?.name ?? ""} ${
        invoicePreviewData.companyBillingProfile?.address ?? ""
      }`;

  let fontInfo;

  try {
    fontInfo = await detectLanguageAndGetFontDynamically(languageSample);
    Font.register({
      family: fontInfo.family,
      fonts: fontInfo.fonts,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error (Failed to load font information)", { status: 500 });
  }

  /* ------
  Create a stream containing the pdf blob
  ------ */
  let stream;

  try {
    stream = await renderToStream(
      <InvoiceTemplate
        fontFamily={fontInfo.family}
        header={header}
        invoiceInfos={invoiceInfo}
        rewardSummary={rewardSummary}
        footer={footer}
      />
    );
    if (!stream) {
      return new NextResponse("Internal Server Error (!stream)", { status: 500 });
    }
  } catch (e) {
    console.error("catch error", e);
    return new NextResponse("Internal Server Error (catch)", { status: 500 });
  }

  /* ------
  Return the blob as a response
  ------ */
  return new NextResponse(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "x-invoice-id": invoicePreviewData.id,
    },
    status: 201,
  });
}
