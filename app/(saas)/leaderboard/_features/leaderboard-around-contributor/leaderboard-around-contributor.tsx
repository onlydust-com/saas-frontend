import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { TableCell, TableRow } from "@/shared/ui/table";
import { TypographyH4 } from "@/shared/ui/typography";

import { ContributorInfo } from "../contributor-info/contributor-info";
import { ScoreDetailsPopover } from "../score-details-popover/score-details-popover";

export function LeaderboardAroundContributor() {
  const { user } = useAuthUser();
  const { data: leaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      aroundContributorId: user?.githubUserId,
      aroundContributorRowCount: 3,
    },
  });

  if (!leaderboard?.rows?.length) return null;

  return leaderboard.rows.map(row => (
    <TableRow key={row.id} className={row.githubUserId === user?.githubUserId ? "bg-primary/10" : ""}>
      <TableCell>
        <TypographyH4>#{row.rank}</TypographyH4>
      </TableCell>
      <TableCell>
        <ContributorInfo row={row} />
      </TableCell>
      <TableCell className="flex justify-end">
        <ScoreDetailsPopover row={row} />
      </TableCell>
    </TableRow>
  ));
}
