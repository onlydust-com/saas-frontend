"use client";

import { ArrowDownWideNarrow, ArrowRight, ArrowUpNarrowWide } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionActivityStatusUnion } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

type SortDirection = "ASC" | "DESC";

export function Issues() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<ContributionActivityStatusUnion[]>([
    "IN_PROGRESS",
    "TO_REVIEW",
    "DONE",
    "ARCHIVED",
  ]);
  const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm]
  );

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      statuses: selectedStatuses,
      projectSlugs: [projectSlug],
      search: debouncedSearchTerm || undefined,
      sortDirection,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const statusOptions = useMemo(
    () => [
      { value: "IN_PROGRESS" as ContributionActivityStatusUnion, label: "In Progress" },
      { value: "TO_REVIEW" as ContributionActivityStatusUnion, label: "To Review" },
      { value: "DONE" as ContributionActivityStatusUnion, label: "Done" },
      { value: "ARCHIVED" as ContributionActivityStatusUnion, label: "Archived" },
    ],
    []
  );

  const contributions = useMemo(() => {
    return data?.pages.flatMap(page => page.contributions) ?? [];
  }, [data]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusChange = useCallback((status: ContributionActivityStatusUnion) => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  }, []);

  const handleSortDirectionToggle = useCallback(() => {
    setSortDirection(prev => (prev === "ASC" ? "DESC" : "ASC"));
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
      <Link
        key={contribution.id}
        href={NEXT_ROUTER.maintainer.projects.details.issues.details.root(projectSlug, contribution.id)}
      >
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
  }, [contributions, isError, isLoading, projectSlug, dateKernelPort]);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input placeholder="Search issues" value={searchTerm} onChange={handleSearchChange} className="flex-1" />

        <div className="flex flex-row gap-2">
          <Button variant="outline" onClick={handleSortDirectionToggle} className="flex items-center gap-2">
            Last Updated{" "}
            {sortDirection === "ASC" ? (
              <ArrowUpNarrowWide className="h-4 w-4" />
            ) : (
              <ArrowDownWideNarrow className="h-4 w-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status {selectedStatuses.length < statusOptions.length && `(${selectedStatuses.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {statusOptions.map(status => (
                <DropdownMenuItem key={status.value} className="p-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`status-${status.value}`}
                      checked={selectedStatuses.includes(status.value)}
                      onCheckedChange={() => handleStatusChange(status.value)}
                    />
                    <label htmlFor={`status-${status.value}`} className="flex-1 cursor-pointer text-sm">
                      {status.label}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {renderContributions()}
    </section>
  );
}
