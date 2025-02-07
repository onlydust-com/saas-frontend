"use client";

import { CloudDownload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { withBillingProfileAdminGuard } from "@/app/(saas)/settings/billing-profiles/_features/billing-profile-admln-guard/billing-profile-admln-guard";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

import { InvoiceStatus } from "./_components/invoice-status/invoice-status";

function BillingProfileInvoicesPage({ params }: { params: { id: string } }) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const [invoiceMetaData, setInvoiceMetaData] = useState<{ invoiceId: string | undefined; number: string | undefined }>(
    { invoiceId: "", number: "" }
  );

  const {
    data: invoicesData,
    isLoading: invoicesLoading,
    isError: invoicesError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileInvoices({
    pathParams: { billingProfileId: params.id },
    queryParams: {
      sort: "CREATED_AT",
      direction: "DESC",
    },
  });

  const {
    data: downloadedInvoice,
    isError: isDownloadError,
    isLoading: isDownloading,
  } = BillingProfileReactQueryAdapter.client.useDownloadBillingProfileInvoiceById({
    pathParams: {
      billingProfileId: params.id,
      invoiceId: invoiceMetaData.invoiceId ?? "",
    },
    options: { enabled: Boolean(invoiceMetaData.invoiceId) },
  });

  useEffect(() => {
    if (downloadedInvoice) {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(downloadedInvoice);
      downloadLink.download = invoiceMetaData.number ?? "invoice.pdf";
      downloadLink.click();
      setInvoiceMetaData({ invoiceId: "", number: "" });
      toast.success("Invoice downloaded");
    }
  }, [downloadedInvoice]);

  useEffect(() => {
    if (isDownloadError) {
      toast.error("Error downloading invoice");
    }
  }, [isDownloadError]);

  function onDownloadInvoice({ invoiceId, number }: { invoiceId: string | undefined; number: string | undefined }) {
    setInvoiceMetaData({ invoiceId, number });
  }

  const invoices = useMemo(() => {
    return invoicesData?.pages.flatMap(page => page.invoices) ?? [];
  }, [invoicesData]);

  if (invoicesLoading) {
    return <Skeleton className="h-96" />;
  }

  if (invoicesError) {
    return <ErrorState />;
  }

  return (
    <div>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "billing-profiles",
            label: "Billing Profiles",
            href: NEXT_ROUTER.settings.billingProfiles.root,
          },
          {
            id: "invoices",
            label: "Invoices",
          },
        ]}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length ? (
            invoices.map(({ id, number, createdAt, totalAfterTax, status }) => {
              const { amount, code } = moneyKernelPort.format({
                amount: totalAfterTax?.amount,
                currency: totalAfterTax?.currency,
              });
              return (
                <TableRow key={id}>
                  <TableCell>{number}</TableCell>
                  <TableCell>{createdAt ? dateKernelPort.format(new Date(createdAt), "yyyy-MM-dd") : "-"}</TableCell>
                  <TableCell>
                    {amount} {code}
                  </TableCell>
                  <TableCell>
                    <InvoiceStatus status={status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"outline"}
                      onClick={() => onDownloadInvoice({ invoiceId: id, number })}
                      disabled={!id || isDownloading}
                    >
                      <Icon component={CloudDownload} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}

export default withClientOnly(withAuthenticated(withBillingProfileAdminGuard(BillingProfileInvoicesPage)));
