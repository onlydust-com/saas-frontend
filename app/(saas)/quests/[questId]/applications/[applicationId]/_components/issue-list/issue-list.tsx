import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import Emoji from "react-emoji-render";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Markdown } from "@/shared/features/markdown/markdown";
import { Github } from "@/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/shared/ui/sheet";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyH4, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { AmountOfWorkBadge } from "../amount-of-work-badge/amount-of-work-badge";
import { IssueListProps } from "./issue-list.types";

function IssueListItem({ issue }: { issue: IssueListProps["issues"][number] }) {
  return (
    <div key={issue.number} className={"w-full text-left transition-opacity hover:opacity-80"}>
      <Card className={"flex cursor-pointer flex-col items-start justify-start gap-2 p-3"}>
        <div className="flex w-full items-center justify-between gap-px">
          <div className={"flex flex-1 items-center gap-3"}>
            <ContributionBadge type={issue.type} number={issue.number} githubStatus={issue.githubStatus} />

            <TypographySmall className={"line-clamp-1"}>
              <Emoji>{issue.title}</Emoji>
            </TypographySmall>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 first:pl-0">
            <div className="flex flex-col gap-1">
              <AmountOfWorkBadge value={issue.score} />
            </div>
          </div>
        </div>
        <TypographyMuted className={"line-clamp-1"}>
          <Emoji>
            {issue.justifications?.length > 100 ? `${issue.justifications.slice(0, 100)}...` : issue.justifications}
          </Emoji>
        </TypographyMuted>
      </Card>
    </div>
  );
}

function IssueListItemPanel({
  issue,
  children,
}: {
  issue: IssueListProps["issues"][number];
  children: React.ReactNode;
}) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: issue.uuid },
    options: { enabled: Boolean(issue.uuid) && open },
  });

  const renderMetrics = useCallback(() => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[74px]" />
          ))}
        </div>
      );
    }

    if (!data || isError) return null;

    const openedSince = parseInt(dateKernelPort.formatDistanceToNow(new Date(data.createdAt), { unit: "day" }));

    return (
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3">
          <TypographyMuted>Applicants</TypographyMuted>
          <TypographyH4>{data.applicants.length}</TypographyH4>
        </Card>

        <Card className="p-3">
          <TypographyMuted>Comments</TypographyMuted>
          <TypographyH4>{data.githubCommentCount}</TypographyH4>
        </Card>

        <Card className="p-3">
          <TypographyMuted>Opened since</TypographyMuted>
          <TypographyH4>{openedSince === 1 ? "1 day" : `${openedSince} days`}</TypographyH4>
        </Card>
      </div>
    );
  }, [data, isLoading, isError]);

  const renderSummary = useCallback(() => {
    if (isLoading) {
      return <Skeleton className="h-40" />;
    }

    if (!data || isError) return null;

    const createdSince = dateKernelPort.formatDistanceToNow(new Date(data.createdAt));

    return (
      <Card className="flex flex-col gap-3 p-3">
        <header className={"flex w-full flex-row items-center justify-start gap-3"}>
          <ContributionBadge type={data.type} number={data.githubNumber} githubStatus={data.githubStatus} />
          <TypographyH4 className="line-clamp-1">{data.githubTitle}</TypographyH4>
        </header>

        {data.githubBody ? <Markdown content={data.githubBody} /> : null}

        <TypographyMuted>{createdSince}</TypographyMuted>

        <footer className="flex items-end justify-between gap-3">
          <ul className="flex flex-row flex-wrap gap-2">
            {data.githubLabels?.map(label => (
              <li key={label.name}>
                <Badge variant="outline">{label.name}</Badge>
              </li>
            ))}
          </ul>

          <Link href={NEXT_ROUTER.users.details.root(data.githubAuthor.login)}>
            <Avatar className="size-5">
              <AvatarImage src={data.githubAuthor.avatarUrl} alt={data.githubAuthor.login} />
              <AvatarFallback className="size-5">{data.githubAuthor.login.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </footer>
      </Card>
    );
  }, [data, isLoading, isError]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className={"flex flex-col"}>
        <SheetHeader className="flex flex-row items-center justify-start gap-2">
          <AmountOfWorkBadge value={issue.score} />
        </SheetHeader>
        <ScrollArea className="flex flex-1 flex-col gap-4">
          {renderSummary()}
          {renderMetrics()}
          <Card
            className={cn(
              "relative flex flex-col gap-4 overflow-hidden bg-gradient-to-br from-purple-950 to-transparent to-20% p-4"
            )}
          >
            <header className={"flex w-full items-center justify-start gap-2"}>
              <div className={"flex items-center gap-2"}>
                <Sparkles className={"text-purple-700"} />
                <TypographyH3>Analysis by OnlyDust</TypographyH3>
              </div>
            </header>

            <div className={"relative h-fit overflow-hidden transition-all"}>
              <TypographyP>{issue.justifications}</TypographyP>
            </div>
          </Card>
          {data?.githubBody ? (
            <Card className={cn("overflow-hiddenp-4 relative flex flex-col gap-4")}>
              <header className={"flex w-full items-center justify-start gap-2"}>
                <div className={"flex items-center gap-2"}>
                  <TypographyH3>Description</TypographyH3>
                </div>
              </header>

              <div className={"relative h-fit overflow-hidden transition-all"}>
                <Markdown content={data.githubBody} />
              </div>
            </Card>
          ) : null}
        </ScrollArea>
        <SheetFooter>
          <Button variant={"outline"} asChild>
            <Link href={issue.url} target="_blank">
              <Github />
              See on Github
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function IssueList({
  containerClassName,
  title,
  emptyMessage,
  errorMessage,
  description,
  issues,
  isError,
  isLoading,
}: IssueListProps) {
  const dateKernel = bootstrap.getDateKernelPort();

  const renderIssues = useCallback(() => {
    if (isLoading) {
      return (
        <ul className={"flex flex-col gap-3"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Skeleton className={"h-12 w-full"} />
            </li>
          ))}
        </ul>
      );
    }

    if (isError) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>{errorMessage}</TypographyMuted>
        </div>
      );
    }

    if (issues.length === 0) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>{emptyMessage}</TypographyMuted>
        </div>
      );
    }

    return (
      <div className={"flex flex-col gap-3"}>
        {issues.map(issue => (
          <IssueListItemPanel key={issue.number} issue={issue}>
            <IssueListItem issue={issue} />
          </IssueListItemPanel>
        ))}
      </div>
    );
  }, [issues, isLoading, isError, dateKernel]);

  return (
    <Card className={cn("flex flex-col gap-4 p-4", containerClassName)}>
      <header className={"flex items-center gap-2"}>
        <TypographyH3>{title}</TypographyH3>
      </header>

      <TypographyP>{description}</TypographyP>

      {renderIssues()}
    </Card>
  );
}
