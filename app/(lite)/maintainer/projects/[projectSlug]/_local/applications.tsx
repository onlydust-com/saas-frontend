"use client";

import { Card } from "@nextui-org/react";
import { useCallback, useMemo } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { ShowMore } from "@/shared/ui/show-more";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyLarge, TypographyMuted } from "@/shared/ui/typography";

export function Applications({ projectId }: { projectId: string }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ApplicationReactQueryAdapter.client.useGetApplications({
      queryParams: {
        projectId,
      },
      options: {
        enabled: Boolean(projectId),
      },
    });

  const applications = useMemo(() => data?.pages.flatMap(page => page.applications) ?? [], [data]);

  const renderApplications = useCallback(() => {
    if (isLoading) {
      return (
        <section className="flex flex-col gap-4">
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
        </section>
      );
    }

    if (isError) {
      return <TypographyMuted className="py-16 text-center">Error loading applications</TypographyMuted>;
    }

    if (applications.length === 0) {
      return <TypographyMuted className="py-16 text-center">No applications found</TypographyMuted>;
    }

    return applications?.map(application => (
      <Card key={application.id}>
        <CardHeader>
          <CardTitle>{application.id}</CardTitle>
        </CardHeader>
      </Card>
    ));
  }, [applications, isLoading, isError]);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <div>
        <TypographyLarge>Latest applications ({applications.length})</TypographyLarge>
        <TypographyMuted>Recent applicant submissions to review.</TypographyMuted>
      </div>

      <Input placeholder="Search applications" />

      {renderApplications()}

      <ShowMore hasNextPage={hasNextPage} onNext={fetchNextPage} loading={isFetchingNextPage} />
    </section>
  );
}
