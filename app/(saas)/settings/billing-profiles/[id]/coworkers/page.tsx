"use client";

import Link from "next/link";
import { useMemo } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { bootstrap } from "@/core/bootstrap";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

function BillingProfileCoworkersPage({ params }: { params: { id: string } }) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const {
    data: coworkersData,
    isLoading: coworkersLoading,
    isError: coworkersError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileCoworkers({
    pathParams: { billingProfileId: params.id },
  });

  const coworkers = useMemo(() => {
    return coworkersData?.pages.flatMap(page => page.coworkers) ?? [];
  }, [coworkersData]);

  const totalItemNumber = useMemo(() => coworkersData?.pages[0].totalItemNumber, [coworkersData]);

  if (coworkersLoading) {
    return <Skeleton className="h-96" />;
  }

  if (coworkersError) {
    return <TypographyMuted>Failed to load coworkers data</TypographyMuted>;
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
            id: "coworkers",
            label: "Coworkers",
          },
        ]}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coworkers.map(coworker => (
            <TableRow key={coworker.id}>
              <TableCell>
                <Link href={NEXT_ROUTER.users.details.root(coworker.login)} className="flex w-fit items-center gap-2">
                  <Avatar>
                    <AvatarImage src={coworker.avatarUrl} alt={coworker.login} />
                    <AvatarFallback>{coworker.login.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <TypographyP>{coworker.login}</TypographyP>
                </Link>
              </TableCell>
              <TableCell>{coworker.role}</TableCell>
              <TableCell>
                {coworker.joinedAt ? dateKernelPort.format(new Date(coworker.joinedAt), "yyyy-MM-dd") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: {totalItemNumber}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}

// TODO @Billing add withBillingProfileAdminGuard
export default withClientOnly(withAuthenticated(BillingProfileCoworkersPage));
