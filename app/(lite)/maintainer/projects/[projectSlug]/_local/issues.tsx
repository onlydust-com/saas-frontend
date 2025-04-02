"use client";

import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Issues() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm]
  );

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      statuses: [
        ContributionActivityStatus.IN_PROGRESS,
        ContributionActivityStatus.TO_REVIEW,
        ContributionActivityStatus.DONE,
        ContributionActivityStatus.ARCHIVED,
      ],
      projectSlugs: [projectSlug],
      search: debouncedSearchTerm || undefined,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const renderContributions = useCallback(() => {
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
      return <TypographyMuted className="py-16 text-center">Error loading issues</TypographyMuted>;
    }

    if (contributions.length === 0) {
      return <TypographyMuted className="py-16 text-center">No issues found</TypographyMuted>;
    }

    return contributions?.map(contribution => (
      <Link key={contribution.id} href={`/lite/my-projects/${projectSlug}/issues/${contribution.id}`}>
        <Card>
          <div className="flex items-start gap-2 p-3">
            <ContributionBadge
              type={contribution.type}
              githubStatus={contribution.githubStatus}
              number={contribution.githubNumber}
            />

            <div className="flex flex-1 flex-col gap-2">
              <header className="flex items-start justify-between gap-2">
                <div>
                  <TypographyMuted>
                    {contribution.repo.owner}/{contribution.repo.name}
                  </TypographyMuted>

                  <TypographyP className="line-clamp-1">
                    <Emoji>{contribution.githubTitle}</Emoji>
                  </TypographyP>
                </div>

                <TypographyMuted>
                  {dateKernelPort.differenceInDays(new Date(), new Date(contribution.lastUpdatedAt))}d
                </TypographyMuted>
              </header>

              {contribution.githubLabels?.length ? (
                <div className="flex flex-wrap gap-2">
                  {contribution.githubLabels.map(label => (
                    <Badge key={label.name} variant="secondary">
                      {label.name}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <footer className="flex items-center justify-between border-t px-3 py-2">
            <TypographyMuted>{contribution.applicants.length} applications</TypographyMuted>

            <Button variant="secondary" size="sm">
              Manage <ArrowRight />
            </Button>
          </footer>
        </Card>
      </Link>
    ));
  }, [contributions, isError, isLoading, projectSlug]);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <Input placeholder="Search issues" value={searchTerm} onChange={handleSearchChange} />

      {renderContributions()}
    </section>
  );
}
