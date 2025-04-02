"use client";

import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { ShowMore } from "@/shared/ui/show-more";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyLarge, TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { ApplicationPanel } from "./application-panel";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Applications({ projectId }: { projectId: string }) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useDebounce(
    () => {
      setDebouncedSearch(searchTerm);
    },
    500,
    [searchTerm]
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ApplicationReactQueryAdapter.client.useGetApplications({
      queryParams: {
        projectId,
        applicantLoginSearch: debouncedSearch,
      },
      options: {
        enabled: Boolean(projectId),
      },
    });

  const applications = useMemo(() => data?.pages.flatMap(page => page.applications) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber, [data]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const renderApplications = useCallback(() => {
    if (isLoading) {
      return (
        <section className="flex flex-col gap-4">
          <Skeleton className="h-[108px] w-full" />
          <Skeleton className="h-[108px] w-full" />
          <Skeleton className="h-[108px] w-full" />
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
      <ApplicationPanel key={application.id} contributorId={application.applicant.githubUserId} applicationId={application.id}>
        <Card className="flex flex-col gap-3 p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-10">
                <AvatarImage src={application.applicant.avatarUrl} />
                <AvatarFallback>{application.applicant.login.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <TypographyP>{application.applicant.login}</TypographyP>
                <TypographyMuted>{application.applicantRank.getTitle().wording}</TypographyMuted>
              </div>
            </div>

            <TypographyMuted>{dateKernelPort.formatDistanceToNow(new Date(application.receivedAt))}</TypographyMuted>
          </div>

          <div className="flex items-center gap-2">
            <ContributionBadge type="ISSUE" githubStatus={application.issue.status} number={application.issue.number} />

            <TypographyMuted className="line-clamp-1">
              <Emoji>{application.issue.title}</Emoji>
            </TypographyMuted>
          </div>
        </Card>
      </ApplicationPanel>
    ));
  }, [applications, isLoading, isError]);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <div>
        <TypographyLarge>Latest applications ({totalItemNumber})</TypographyLarge>
        <TypographyMuted>Recent applicant submissions to review.</TypographyMuted>
      </div>

      <Input placeholder="Search for an applicant" value={searchTerm} onChange={handleSearchChange} />

      {renderApplications()}

      <ShowMore hasNextPage={hasNextPage} onNext={fetchNextPage} loading={isFetchingNextPage} />
    </section>
  );
}
