"use client";

import { Trophy } from "lucide-react";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";
import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

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
    1: "bg-gradient-to-br from-yellow-950 via-amber-900 to-transparent to-70%",
    2: "bg-gradient-to-br from-purple-950 via-purple-900 to-transparent to-70%",
    3: "bg-gradient-to-br from-blue-950 via-blue-900 to-transparent to-70%",
  };

  const medals = {
    1: "🏆",
    2: "🥈",
    3: "🥉",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          heights[position as keyof typeof heights],
          colors[position as keyof typeof colors],
          "flex w-40 flex-col items-center justify-center gap-4 rounded-lg border p-4 transition-all hover:border-primary/50",
          position === 1 && "border-yellow-600/50 shadow-lg shadow-yellow-900/20"
        )}
      >
        <div className="relative">
          <Avatar
            className={cn("h-16 w-16", position === 1 && "ring-2 ring-yellow-500 ring-offset-2 ring-offset-background")}
          >
            <AvatarImage src={leader.avatarUrl} alt={leader.login} />
            <AvatarFallback>{leader.login.charAt(0)}</AvatarFallback>
          </Avatar>
          {position === 1 && <Trophy className="absolute -right-2 -top-2 h-6 w-6 text-yellow-500" />}
        </div>
        <div className="flex flex-col items-center gap-1">
          <TypographyH4 className={cn(position === 1 && "shine-text")}>{leader.login}</TypographyH4>
          <TypographyP className="text-muted-foreground">
            <span className="font-bold text-primary">{leader.finalScore}</span> pts
          </TypographyP>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xl">{medals[position as keyof typeof medals]}</span>
        <TypographyH4 className={cn("text-muted-foreground", position === 1 && "text-yellow-500")}>
          #{position}
        </TypographyH4>
      </div>
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
    <Card className="relative overflow-hidden p-8">
      {/* Subtle confetti background for the card */}
      <div className="absolute inset-0 bg-[radial-gradient(#dd7bbb_1px,transparent_1px)] opacity-5 [background-size:16px_16px]"></div>

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
