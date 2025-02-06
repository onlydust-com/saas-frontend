import Link from "next/link";
import { useMemo } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { bootstrap } from "@/core/bootstrap";
import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { ManageCoworker } from "../manage-coworker/manage-coworker";
import { UpdateCoworkerRole } from "../update-coworker-role/update-coworker-role";
import { CoworkersTableProps } from "./coworkers-table.types";

export function CoworkersTable({ id }: CoworkersTableProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { user } = useAuthUser();
  const {
    data: coworkersData,
    isLoading: coworkersLoading,
    isError: coworkersError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileCoworkers({
    pathParams: { billingProfileId: id },
  });

  const coworkers = useMemo(() => {
    return coworkersData?.pages.flatMap(page => page.coworkers) ?? [];
  }, [coworkersData]);

  if (coworkersLoading) {
    return <Skeleton className="h-96" />;
  }

  if (coworkersError) {
    return <TypographyMuted>Failed to load coworkers data</TypographyMuted>;
  }
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
                  <div className="flex flex-col">
                    <TypographyP>{coworker.login}</TypographyP>
                    {coworker.hasPendingInvitation() ? <TypographyMuted>Invitation pending</TypographyMuted> : null}
                    {user?.githubUserId && coworker.isSelf(user.githubUserId) ? (
                      <TypographyMuted>You</TypographyMuted>
                    ) : null}
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <UpdateCoworkerRole
                  billingProfileId={id}
                  githubUserId={coworker.githubUserId}
                  currentRole={coworker.role as BillingProfileRole}
                />
              </TableCell>
              <TableCell>
                {coworker.joinedAt ? dateKernelPort.format(new Date(coworker.joinedAt), "yyyy-MM-dd") : "-"}
              </TableCell>
              <TableCell className="flex justify-end">
                {user?.githubUserId && coworker.canManageCoworker(user?.githubUserId) ? (
                  <ManageCoworker
                    actionType={coworker.actionType()}
                    githubUserId={coworker.githubUserId}
                    billingProfileId={id}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}
