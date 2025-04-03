import { ExternalLink, Folder, HandCoins } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "sonner";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted, TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function AssignIssuePanel({
  contributorId,
  applicationId,
  issueId = 0,
  onSuccess,
}: {
  contributorId: number;
  applicationId: string;
  issueId?: number;
  onSuccess?: () => void;
}) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { data: bi } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: contributorId.toString() },
    options: {
      enabled: Boolean(contributorId),
    },
  });

  const { data: application } = ApplicationReactQueryAdapter.client.useGetApplicationById({
    pathParams: { applicationId: applicationId },
    options: {
      enabled: Boolean(applicationId),
    },
  });

  const { data: issue } = IssueReactQueryAdapter.client.useGetIssue({
    pathParams: { issueId },
    options: { enabled: Boolean(issueId) },
  });

  const { mutate: assign, isPending: isAssigning } = ApplicationReactQueryAdapter.client.useAcceptApplication({
    pathParams: {
      applicationId,
    },
    options: {
      onSuccess: () => {
        toast.success(`${contributor?.login} was assigned to issue #${application?.issue.number}`);
        onSuccess?.();
      },
      onError: () => {
        toast.error(`Failed to assign ${contributor?.login} to issue #${application?.issue.number}`);
      },
    },
  });

  if (!application || !bi) {
    return null;
  }

  const contributor = bi.contributor;

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b p-4">
        <Link href={NEXT_ROUTER.users.details.root(contributor?.login ?? "")} target="_blank">
          <Button variant="secondary" size="sm">
            Public profile
            <ExternalLink />
          </Button>
        </Link>

        {/* <div className="flex gap-1">
          <Button variant="outline" size="icon">
            <ChevronUp />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronDown />
          </Button>
        </div> */}
      </header>

      <div className="flex flex-1 flex-col gap-8 overflow-auto p-4">
        {/* Contribution Item */}
        {issue ? (
          <Card className="flex items-start gap-2 p-3">
            <ContributionBadge type="ISSUE" githubStatus={issue.status} number={issue.number} />

            <div className="flex flex-1 flex-col gap-2">
              <header className="flex items-start justify-between gap-2">
                <div>
                  <TypographyMuted>
                    {issue.repo.owner}/{issue.repo.name}
                  </TypographyMuted>

                  <TypographyP className="line-clamp-1">
                    <Emoji>{issue.title}</Emoji>
                  </TypographyP>
                </div>

                <TypographyMuted>
                  {dateKernelPort.differenceInDays(new Date(), new Date(issue.createdAt))}d
                </TypographyMuted>
              </header>

              {issue.labels?.length ? (
                <div className="flex flex-wrap gap-2">
                  {issue.labels.map(label => (
                    <Badge key={label.name} variant="secondary">
                      {label.name}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>
        ) : null}

        {/* Contributor Profile */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={contributor?.avatarUrl} />
              <AvatarFallback>{contributor?.login.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <TypographyP>{contributor?.login}</TypographyP>
              <TypographyMuted>{bi.rank.getTitle().wording}</TypographyMuted>
            </div>
          </div>

          <TypographyH4 className="text-purple-500">{bi.rank.getRank()}</TypographyH4>
        </section>

        {/* Github Comment */}
        <Card className="flex flex-col p-3">
          <TypographyP>Github comment</TypographyP>

          <TypographyMuted>
            <Emoji>{application.githubComment}</Emoji>
          </TypographyMuted>
        </Card>

        {/* Metrics Overview */}
        <section className="flex flex-col gap-4">
          <div>
            <TypographyP>Metrics overview</TypographyP>
            <TypographyMuted>Performance metrics at a glance.</TypographyMuted>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="flex items-center gap-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-lime-600/10">
                <HandCoins className="size-4 text-lime-600" />
              </div>
              <span>{Intl.NumberFormat().format(bi.rewardCount.value ?? 0)} rewards</span>
            </Card>

            <Card className="flex items-center gap-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-pink-600/10">
                <Folder className="size-4 text-pink-600" />
              </div>
              <span>{Intl.NumberFormat().format(bi.projects.length ?? 0)} projects</span>
            </Card>

            <Card className="flex items-center gap-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-600/10">
                <Folder className="size-4 text-cyan-600" />
              </div>
              <span>{Intl.NumberFormat().format(bi.inProgressIssueCount ?? 0)} issues in progress</span>
            </Card>

            <Card className="flex items-center gap-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600/10">
                <Folder className="size-4 text-purple-600" />
              </div>
              <span>{Intl.NumberFormat().format(bi.prCount.value ?? 0)} merged PRs</span>
            </Card>
          </div>
        </section>

        {/* Completed Issues */}
        {/* <div className="mb-2 px-4">
          <h3 className="mb-1 font-medium">Completed issues</h3>
          <p className="text-sm text-muted-foreground">Completion ratio: issues resolved vs. assigned.</p>

          <div className="mt-3">
            <Progress value={65} className="h-10 bg-cyan-700/30" progressBarClassName="bg-cyan-500" />
          </div>

          <div className="mt-4 flex text-sm">
            <div className="flex flex-1 items-center gap-1">
              <ArrowRight className="h-4 w-4 text-blue-400" />
              <span>10 issues</span>
            </div>
            <div className="flex flex-1 items-center gap-1">
              <ArrowRight className="h-4 w-4 text-blue-400" />
              <span>5 issues</span>
            </div>
            <div className="flex flex-1 items-center gap-1">
              <ArrowDown className="h-4 w-4 text-pink-400" />
              <span>-5 issues (-50%)</span>
            </div>
          </div>
        </div> */}

        {/* Key Projects */}
        <section className="flex flex-col gap-4">
          <div>
            <TypographyP>Contributed projects</TypographyP>
            <TypographyMuted>Key projects with contributions.</TypographyMuted>
          </div>

          {bi.projects.slice(0, 5).map(project => (
            <Link key={project.id} href={NEXT_ROUTER.maintainer.projects.details.root(project.slug)}>
              <Card className={"flex w-full items-center gap-4 p-3"}>
                <Avatar className="size-10 rounded-xl">
                  <AvatarImage src={project.logoUrl} />
                  <AvatarFallback className="rounded-xl">{project.name[0]}</AvatarFallback>
                </Avatar>

                <TypographyH4 className="line-clamp-1">{project.name}</TypographyH4>
              </Card>
            </Link>
          ))}
        </section>
      </div>

      {/* Assign Button */}
      <footer className="border-t p-4">
        <Button className="w-full" onClick={() => assign({})} loading={isAssigning}>
          Assign
        </Button>
      </footer>
    </div>
  );
}
