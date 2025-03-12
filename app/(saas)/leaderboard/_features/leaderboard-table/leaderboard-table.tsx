"use client";

import Link from "next/link";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyH4, TypographyP, TypographySmall } from "@/shared/ui/typography";

import { LeaderboardFilters } from "../leaderboard-filters/leaderboard-filters";

export function LeaderboardTable() {
  const { data: leaderboard, isLoading: loadingLeaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      fromRank: 1,
      toRank: 10,
    },
  });

  const contributorScoreTooltip =
    "How Your Score is Calculated 🏆\n\nYour Contributor Score determines your rank on the leaderboard. Here's how it works:\n\n🔹 Base Formula:\nContributor Score = (🌟 Project Score × 🔨 Amount of Work) - 🔥 Longest Daily Streak\n\n🔹 Project Score: The more popular the project, the higher its value.\n\n🔹 Amount of Work: Your contributions matter! More meaningful work means a higher score. However, your first two PRs have a small penalty to prevent quick gaming of the system.\n\n🔹 Longest Daily Streak Penalty: Staying consistent is great, but long, uninterrupted daily streaks slightly reduce your score to encourage focused, high-quality contributions rather than grinding.\n\n🎮 How to Rank Up:\n✅ Contribute to high-impact projects (popular ones give higher scores!)\n✅ Submit valuable work—bigger, meaningful contributions boost your score\n✅ Don't just grind PRs—focus on quality over quantity\n\nKeep pushing, level up, and claim your spot at the top! 🚀";

  return (
    <Card>
      <CardHeader>
        <LeaderboardFilters />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Contributor</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard?.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <TypographyH4>#{row.rank}</TypographyH4>
                </TableCell>
                <TableCell>
                  <Link href={NEXT_ROUTER.users.details.root(row.login)} className="flex w-fit items-center gap-2">
                    <Avatar>
                      <AvatarImage src={row.avatarUrl} alt={row.login} />
                      <AvatarFallback>{row.login.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <TypographyP>{row.login}</TypographyP>
                      {/* <TypographyMuted>Diamond</TypographyMuted> */}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="flex justify-end">
                  <Popover>
                    <PopoverTrigger>
                      <Badge variant="emphasis">
                        <TypographyH4>{row.finalScore}</TypographyH4>
                      </Badge>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[400px] p-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <TypographySmall className="text-muted-foreground">Work Score</TypographySmall>
                          <Badge variant="outline">{row.totalWorkScore}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <TypographySmall className="text-muted-foreground">Project Bonus</TypographySmall>
                          <Badge variant="outline">{row.totalProjectBonus}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <TypographySmall className="text-muted-foreground">Fidelity Bonus</TypographySmall>
                          <Badge variant="outline">{row.totalFidelityBonus}</Badge>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
