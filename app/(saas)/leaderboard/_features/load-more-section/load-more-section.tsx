import { MoveDown, MoveVertical } from "lucide-react";
import { useState } from "react";

import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { Spinner } from "@/design-system/atoms/spinner";

import { TableCell, TableRow } from "@/shared/ui/table";

import { LeaderboardAroundContributor } from "../leaderboard-around-contributor/leaderboard-around-contributor";

interface LoadMoreSectionProps {
  leaderboard?: { rows: LeaderboardInterface[] };
  fetchingLeaderboard: boolean;
  showLoadUntilPosition: boolean;
  onLoadMore: () => void;
  onLoadUntilUserPosition: () => void;
}

export function LoadMoreSection({
  leaderboard,
  fetchingLeaderboard,
  showLoadUntilPosition,
  onLoadMore,
  onLoadUntilUserPosition,
}: LoadMoreSectionProps) {
  const [loadingType, setLoadingType] = useState<"more" | "position" | null>(null);

  if (!leaderboard?.rows?.length) return null;

  const handleLoadMore = () => {
    setLoadingType("more");
    onLoadMore();
  };

  const handleLoadUntilPosition = () => {
    setLoadingType("position");
    onLoadUntilUserPosition();
  };

  if (!fetchingLeaderboard && loadingType) {
    setLoadingType(null);
  }

  return (
    <>
      {showLoadUntilPosition && (
        <TableRow className="cursor-pointer bg-secondary/20 hover:bg-secondary/30" onClick={handleLoadUntilPosition}>
          <TableCell colSpan={4} className="py-4 text-center">
            <div className="flex items-center justify-center text-muted-foreground">
              {fetchingLeaderboard && loadingType === "position" ? <Spinner /> : <MoveVertical className="h-4 w-4" />}
            </div>
          </TableCell>
        </TableRow>
      )}

      {showLoadUntilPosition && <LeaderboardAroundContributor />}

      <TableRow className="cursor-pointer hover:bg-muted/50" onClick={handleLoadMore}>
        <TableCell colSpan={4} className="py-4 text-center">
          <div className="flex items-center justify-center text-muted-foreground">
            {fetchingLeaderboard && loadingType === "more" ? <Spinner /> : <MoveDown className="h-4 w-4" />}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
