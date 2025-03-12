"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH4, TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { LeaderboardFilters } from "../leaderboard-filters/leaderboard-filters";

export function LeaderboardTable() {
  const { user } = useAuthUser();
  return (
    <Card>
      <CardHeader>
        <LeaderboardFilters />
      </CardHeader>
      <CardContent>
        {/* <div className="mt-4 hidden md:block">
          <div className="mr-4 grid w-full grid-cols-6 py-2 pr-4 text-sm font-medium text-muted-foreground">
            <div>Rank</div>
            <div>Contributor</div>
            <div>Amount of work score</div>
            <div>Fidelity bonus</div>
            <div>Project bonus</div>
            <div>Total score</div>
          </div>
        </div> */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="rounded-sm border-1 px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="grid w-full grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr]">
                <div className="flex items-center justify-start gap-2">
                  <TypographyH4>#1</TypographyH4>
                  <MoveUpRight className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-start">
                  <Link
                    href={NEXT_ROUTER.users.details.root(user?.login ?? "")}
                    className="flex w-fit items-center gap-2"
                    onClick={e => e.stopPropagation()}
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
                </div>
                <div className="flex items-center justify-start">
                  <Badge variant="outline">100</Badge>
                </div>
                <div className="flex items-center justify-start">
                  <Badge variant="outline">100</Badge>
                </div>
                <div className="flex items-center justify-start">
                  <Badge variant="outline">100</Badge>
                </div>
                <div className="flex items-center justify-start">
                  <Tooltip>
                    <TooltipTrigger onClick={e => e.stopPropagation()}>
                      <Badge variant="emphasis">100</Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[400px] whitespace-pre-wrap">
                      {
                        "How Your Score is Calculated 🏆\n\nYour Contributor Score determines your rank on the leaderboard. Here's how it works:\n\n🔹 Base Formula:\nContributor Score = (🌟 Project Score × 🔨 Amount of Work) - 🔥 Longest Daily Streak\n\n🔹 Project Score: The more popular the project, the higher its value.\n\n🔹 Amount of Work: Your contributions matter! More meaningful work means a higher score. However, your first two PRs have a small penalty to prevent quick gaming of the system.\n\n🔹 Longest Daily Streak Penalty: Staying consistent is great, but long, uninterrupted daily streaks slightly reduce your score to encourage focused, high-quality contributions rather than grinding.\n\n🎮 How to Rank Up:\n✅ Contribute to high-impact projects (popular ones give higher scores!)\n✅ Submit valuable work—bigger, meaningful contributions boost your score\n✅ Don't just grind PRs—focus on quality over quantity\n\nKeep pushing, level up, and claim your spot at the top! 🚀"
                      }
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* You can add more AccordionItems here for additional leaderboard entries */}
        </Accordion>
      </CardContent>
    </Card>
  );
}
