"use client";

import { keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback } from "react";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";
import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyH4, TypographyP, TypographySmall } from "@/shared/ui/typography";

import { LeaderboardFilters } from "../leaderboard-filters/leaderboard-filters";

function LeaderboardAroundContributor() {
  const { user } = useAuthUser();
  const { data: leaderboard, isLoading: loadingLeaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      aroundContributorId: user?.githubUserId,
      aroundContributorRowCount: 3,
    },
  });

  return leaderboard?.rows.map(row => (
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
  ));
}

export function LeaderboardTable() {
  const [pagination, setPagination] = React.useState({
    fromRank: 1,
    toRank: 10,
    pageSize: 10,
  });

  const { user } = useAuthUser();

  const { data: leaderboard, isLoading: loadingLeaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      fromRank: 1,
      toRank: pagination.toRank,
    },
    options: {
      placeholderData: keepPreviousData,
    },
  });

  const { data: userLeaderboardPosition } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      aroundContributorId: user?.githubUserId,
      aroundContributorRowCount: 3,
    },
    options: {
      enabled: !!user && !!leaderboard?.rows && !leaderboard.rows.some(row => row.githubUserId === user?.githubUserId),
    },
  });

  const handleLoadMore = () => {
    setPagination(prev => ({
      ...prev,
      toRank: prev.toRank + prev.pageSize,
    }));
  };

  const shouldShowLoadUntilUserPosition = () => {
    if (!user || !userLeaderboardPosition?.rows?.length) return false;

    const userPosition = userLeaderboardPosition.rows.find(row => row.githubUserId === user.githubUserId);
    if (!userPosition) return false;

    return userPosition.rank > pagination.toRank;
  };

  const handleLoadUntilUserPosition = () => {
    if (!userLeaderboardPosition?.rows?.length) return;

    const userPosition = userLeaderboardPosition.rows.find(row => row.githubUserId === user?.githubUserId);
    if (!userPosition) return;

    setPagination(prev => ({
      ...prev,
      toRank: userPosition.rank,
    }));
  };

  const contributorScoreTooltip =
    "How Your Score is Calculated 🏆\n\nYour Contributor Score determines your rank on the leaderboard. Here's how it works:\n\n🔹 Base Formula:\nContributor Score = (🌟 Project Score × 🔨 Amount of Work) - 🔥 Longest Daily Streak\n\n🔹 Project Score: The more popular the project, the higher its value.\n\n🔹 Amount of Work: Your contributions matter! More meaningful work means a higher score. However, your first two PRs have a small penalty to prevent quick gaming of the system.\n\n🔹 Longest Daily Streak Penalty: Staying consistent is great, but long, uninterrupted daily streaks slightly reduce your score to encourage focused, high-quality contributions rather than grinding.\n\n🎮 How to Rank Up:\n✅ Contribute to high-impact projects (popular ones give higher scores!)\n✅ Submit valuable work—bigger, meaningful contributions boost your score\n✅ Don't just grind PRs—focus on quality over quantity\n\nKeep pushing, level up, and claim your spot at the top! 🚀";

  const renderLeaderboardRow = useCallback(
    (row: LeaderboardInterface) => (
      <TableRow key={row.id} className={row.githubUserId === user?.githubUserId ? "bg-primary/10" : ""}>
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
    ),
    [user]
  );

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
            {leaderboard?.rows.map(row => renderLeaderboardRow(row))}

            {leaderboard?.rows?.length && leaderboard.rows.length > 0 && (
              <>
                {shouldShowLoadUntilUserPosition() && (
                  <TableRow
                    className="cursor-pointer bg-secondary/20 hover:bg-secondary/30"
                    onClick={handleLoadUntilUserPosition}
                  >
                    <TableCell colSpan={3} className="py-4 text-center">
                      <TypographyP className="font-medium">
                        {loadingLeaderboard ? "Loading..." : "Load Until Your Position"}
                      </TypographyP>
                    </TableCell>
                  </TableRow>
                )}

                {shouldShowLoadUntilUserPosition() && userLeaderboardPosition?.rows && (
                  <TableRow className="border-b-2 border-t-2 border-dashed border-primary/30">
                    <TableCell colSpan={3} className="py-2 text-center">
                      <TypographySmall className="text-muted-foreground">
                        Your position and surrounding contributors
                      </TypographySmall>
                    </TableCell>
                  </TableRow>
                )}

                {shouldShowLoadUntilUserPosition() && <LeaderboardAroundContributor />}

                <TableRow className="cursor-pointer hover:bg-muted/50" onClick={handleLoadMore}>
                  <TableCell colSpan={3} className="py-4 text-center">
                    <TypographyP className="text-muted-foreground">
                      {loadingLeaderboard ? "Loading..." : "Load More"}
                    </TypographyP>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
