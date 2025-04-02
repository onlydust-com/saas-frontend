import { ArrowDown, ArrowRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import { TypographyH4, TypographyMuted, TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function AssignIssuePanel({ contributorId, applicationId }: { contributorId: number; applicationId: string }) {
  const { data } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      contributorIds: [contributorId],
    },
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

  const bi = useMemo(() => data?.pages[0]?.contributors[0], [data]);

  // TODO: Add loading state

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

        <div className="flex gap-1">
          <Button variant="outline" size="icon">
            <ChevronUp />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronDown />
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-6 p-4">
        {/* Contribution Item */}
        {/* <Card className="mx-4 my-4 border-none bg-card/20 p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <span className="font-medium">Improve the performance of algorithm</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>vercel/next.js</span>
          <span>10 days ago</span>
        </div>
      </Card> */}

        {/* Contributor Profile */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={contributor?.avatarUrl} />
              <AvatarFallback>{contributor?.login.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <TypographyP>{contributor?.login}</TypographyP>
              <TypographyMuted>{bi?.rank.getTitle().wording}</TypographyMuted>
            </div>
          </div>

          <TypographyH4 className="text-purple-500">4th</TypographyH4>
        </div>

        {/* Github Comment */}
        <Card className="flex flex-col p-3">
          <TypographyP>Github comment</TypographyP>

          <TypographyMuted>
            <Emoji>{application.githubComment}</Emoji>
          </TypographyMuted>
        </Card>

        {/* Metrics Overview */}
        <div className="mb-2 px-4">
          <h3 className="mb-1 font-medium">Metrics overview</h3>
          <p className="text-sm text-muted-foreground">Performance metrics at a glance.</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span>6 rewards</span>
            </Card>
            <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20">
                <div className="h-3 w-3 rounded-full bg-pink-500" />
              </div>
              <span>11 projects</span>
            </Card>
            <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
              </div>
              <span>1 issue in progress</span>
            </Card>
            <Card className="flex items-center gap-2 border-none bg-card/20 p-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
              </div>
              <span>13 merged PRs</span>
            </Card>
          </div>
        </div>

        {/* Completed Issues */}
        <div className="mb-2 px-4">
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
        </div>

        {/* Key Projects */}
        <div className="mt-2 px-4">
          <h3 className="mb-2 text-sm text-muted-foreground">Key projects with contributions.</h3>

          {[1, 2, 3].map(i => (
            <Card key={i} className="mb-2 flex items-center gap-3 border-none p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-900">
                <div className="h-5 w-5 bg-amber-500" />
              </div>
              <span className="text-muted-foreground">Kakarot is a provable EVM</span>
            </Card>
          ))}
        </div>

        {/* Assign Button */}
        <div className="mt-auto p-4">
          <Button className="w-full" size="lg">
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
}
