"use client";

import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { LeaderboardFilters } from "../leaderboard-filters/leaderboard-filters";

export function LeaderboardTable() {
  const { user } = useAuthUser();

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
              <TableHead>Work Score</TableHead>
              <TableHead>Project Bonus</TableHead>
              <TableHead>Fidelity Bonus</TableHead>
              <TableHead>Inactivity Penalty</TableHead>
              <TableHead>Total score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#1</TableCell>
              <TableCell>
                <Link
                  href={NEXT_ROUTER.users.details.root(user?.login ?? "")}
                  className="flex w-fit items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage src={user?.avatarUrl ?? ""} alt={user?.login ?? ""} />
                    <AvatarFallback>{user?.login?.charAt(0) ?? ""}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <TypographyP>{user?.login ?? ""}</TypographyP>
                    <TypographyMuted>Diamond</TypographyMuted>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline">1000</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">100</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">100</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">100</Badge>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <Badge variant="emphasis">1000</Badge>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-[400px]">
                    <TypographyP>Total score</TypographyP>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>

            {/* You can add more TableRows here for additional leaderboard entries */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
