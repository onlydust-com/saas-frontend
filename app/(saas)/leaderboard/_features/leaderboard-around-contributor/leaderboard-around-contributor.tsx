import { ArrowRight } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { MoveDownRight } from "lucide-react";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { TableCell, TableRow } from "@/shared/ui/table";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { ContributorInfo } from "../contributor-info/contributor-info";
import { ScoreDetailsPopover } from "../score-details-popover/score-details-popover";

export function LeaderboardAroundContributor() {
  const { user } = useAuthUser();
  const { data: leaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      aroundContributorId: user?.githubUserId,
      aroundContributorRowCount: 1,
    },
  });

  if (!leaderboard?.rows?.length) return null;

  return leaderboard.rows.map(row => (
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
  ));
}
