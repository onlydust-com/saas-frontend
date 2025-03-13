import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { TableCell, TableRow } from "@/shared/ui/table";
import { TypographyP, TypographySmall } from "@/shared/ui/typography";

import { LeaderboardAroundContributor } from "../leaderboard-around-contributor/leaderboard-around-contributor";

interface LoadMoreSectionProps {
  leaderboard?: { rows: LeaderboardInterface[] };
  loadingLeaderboard: boolean;
  showLoadUntilPosition: boolean;
  userLeaderboardPosition?: { rows: LeaderboardInterface[] };
  onLoadMore: () => void;
  onLoadUntilUserPosition: () => void;
}

export function LoadMoreSection({
  leaderboard,
  loadingLeaderboard,
  showLoadUntilPosition,
  userLeaderboardPosition,
  onLoadMore,
  onLoadUntilUserPosition,
}: LoadMoreSectionProps) {
  if (!leaderboard?.rows?.length) return null;

  return (
    <>
      {showLoadUntilPosition && (
        <TableRow className="cursor-pointer bg-secondary/20 hover:bg-secondary/30" onClick={onLoadUntilUserPosition}>
          <TableCell colSpan={3} className="py-4 text-center">
            <TypographyP className="font-medium">
              {loadingLeaderboard ? "Loading..." : "Load Until Your Position"}
            </TypographyP>
          </TableCell>
        </TableRow>
      )}

      {showLoadUntilPosition && userLeaderboardPosition?.rows && (
        <TableRow className="border-b-2 border-t-2 border-dashed border-primary/30">
          <TableCell colSpan={3} className="py-2 text-center">
            <TypographySmall className="text-muted-foreground">
              Your position and surrounding contributors
            </TypographySmall>
          </TableCell>
        </TableRow>
      )}

      {showLoadUntilPosition && <LeaderboardAroundContributor />}

      <TableRow className="cursor-pointer hover:bg-muted/50" onClick={onLoadMore}>
        <TableCell colSpan={3} className="py-4 text-center">
          <TypographyP className="text-muted-foreground">{loadingLeaderboard ? "Loading..." : "Load More"}</TypographyP>
        </TableCell>
      </TableRow>
    </>
  );
}
