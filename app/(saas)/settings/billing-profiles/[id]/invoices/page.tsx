"use client";

import { useMemo } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { bootstrap } from "@/core/bootstrap";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

function BillingProfileInvoicesPage({ params }: { params: { id: string } }) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
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

  const invoices = useMemo(() => {
    return invoicesData?.pages.flatMap(page => page.invoices) ?? [];
  }, [invoicesData]);

  const totalItemNumber = useMemo(() => invoicesData?.pages[0].totalItemNumber, [invoicesData]);

  if (invoicesLoading) {
    return <Skeleton className="h-96" />;
  }

  if (invoicesError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
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
          {invoices.map(({ id, number, createdAt, totalAfterTax, status }) => {
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
                <TableCell>{status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}

export default withClientOnly(withAuthenticated(BillingProfileInvoicesPage));
