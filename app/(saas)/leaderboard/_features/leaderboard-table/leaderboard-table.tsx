"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { MoveUpRight } from "lucide-react";
import { MoveDownRight } from "lucide-react";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useState } from "react";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";
import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Card, CardContent } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { CalculationHelper } from "../calculation-helper/calculation-helper";
import { ContributorInfo } from "../contributor-info/contributor-info";
import { LoadMoreSection } from "../load-more-section/load-more-section";
import { ScoreDetailsPopover } from "../score-details-popover/score-details-popover";

export function LeaderboardTable() {
  const [pagination, setPagination] = useState({
    fromRank: 1,
    toRank: 4,
    pageSize: 4,
  });

  const { user } = useAuthUser();

  const { data: leaderboard, isFetching: isFetchingLeaderboard } =
    LeaderboardReactQueryAdapter.client.useGetLeaderboard({
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
      aroundContributorRowCount: 1,
    },
    options: {
      enabled: !!user && !!leaderboard?.rows && !leaderboard.rows.some(row => row.githubUserId === user?.githubUserId),
    },
  });

  const handleLoadMore = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      toRank: prev.toRank + prev.pageSize,
    }));
  }, []);

  const shouldShowLoadUntilUserPosition = useCallback(() => {
    if (!user || !userLeaderboardPosition?.rows?.length) return false;

    const userPosition = userLeaderboardPosition.rows.find(row => row.githubUserId === user.githubUserId);
    if (!userPosition) return false;

    return userPosition.rank > pagination.toRank;
  }, [user, userLeaderboardPosition?.rows, pagination.toRank]);

  const handleLoadUntilUserPosition = useCallback(() => {
    if (!userLeaderboardPosition?.rows?.length) return;

    const userPosition = userLeaderboardPosition.rows.find(row => row.githubUserId === user?.githubUserId);
    if (!userPosition) return;

    setPagination(prev => ({
      ...prev,
      toRank: Math.min(prev.toRank + prev.pageSize, userPosition.rank),
    }));
  }, [userLeaderboardPosition?.rows, user?.githubUserId]);

  const renderLeaderboardRow = useCallback(
    (row: LeaderboardInterface) => (
      <TableRow key={row.githubUserId} className={row.githubUserId === user?.githubUserId ? "bg-primary/10" : ""}>
        <TableCell>
          <TypographyH4>#{row.rank}</TypographyH4>
        </TableCell>
        <TableCell>
          {row.previousDayRank && row.previousDayRank > row.rank && <MoveUpRight className="h-4 w-4 text-green-500" />}
          {row.previousDayRank && row.previousDayRank === row.rank && <ArrowRight className="h-4 w-4 text-blue-500" />}
          {row.previousDayRank && row.previousDayRank < row.rank && <MoveDownRight className="h-4 w-4 text-red-500" />}
          {!row.previousDayRank && <TypographyMuted>-</TypographyMuted>}
        </TableCell>
        <TableCell>
          <ContributorInfo row={row} />
        </TableCell>
        <TableCell className="text-right align-middle">
          <ScoreDetailsPopover row={row} />
        </TableCell>
      </TableRow>
    ),
    [user]
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead className="w-[80px]">Trend</TableHead>
              <TableHead>Contributor</TableHead>
              <TableHead className="text-right align-middle">
                <div className="flex items-center justify-end gap-1">
                  Score <CalculationHelper />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard?.rows?.map(row => renderLeaderboardRow(row))}
            <LoadMoreSection
              leaderboard={leaderboard}
              fetchingLeaderboard={isFetchingLeaderboard}
              showLoadUntilPosition={shouldShowLoadUntilUserPosition()}
              onLoadMore={handleLoadMore}
              onLoadUntilUserPosition={handleLoadUntilUserPosition}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
