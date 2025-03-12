"use client";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";
import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

interface PodiumPositionProps {
  position: number;
  leader?: LeaderboardInterface;
}

function PodiumPosition({ position, leader }: PodiumPositionProps) {
  if (!leader) return null;

  const heights = {
    1: "h-64",
    2: "h-52",
    3: "h-40",
  };

  const colors = {
    1: "bg-gradient-to-br from-yellow-950 to-transparent to-50%",
    2: "bg-gradient-to-br from-purple-950 to-transparent to-50%",
    3: "bg-gradient-to-br from-blue-950 to-transparent to-50%",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${heights[position as keyof typeof heights]} ${
          colors[position as keyof typeof colors]
        } flex w-40 flex-col items-center justify-center gap-4 rounded-lg border p-4`}
      >
        <Avatar className="h-16 w-16">
          <AvatarImage src={leader.avatarUrl} alt={leader.login} />
          <AvatarFallback>{leader.login.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1">
          <TypographyH4>{leader.login}</TypographyH4>
          <TypographyP className="text-muted-foreground">{leader.finalScore} pts</TypographyP>
        </div>
      </div>
      <TypographyH4 className="text-muted-foreground">#{position}</TypographyH4>
    </div>
  );
}

export function LeaderboardPodium() {
  const { data: leaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      fromRank: 1,
      toRank: 3,
    },
  });

  if (!leaderboard?.rows?.length) return null;

  const [first, second, third] = leaderboard.rows;

  return (
    <Card className="p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end sm:justify-center">
        <div className="order-2 sm:order-1">
          <PodiumPosition position={2} leader={second} />
        </div>
        <div className="order-1 sm:order-2">
          <PodiumPosition position={1} leader={first} />
        </div>
        <div className="order-3">
          <PodiumPosition position={3} leader={third} />
        </div>
      </div>
    </Card>
  );
}
