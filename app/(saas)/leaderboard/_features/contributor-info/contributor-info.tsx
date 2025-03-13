import Link from "next/link";

import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { TypographyP } from "@/shared/ui/typography";

interface ContributorInfoProps {
  row: LeaderboardInterface;
}

export function ContributorInfo({ row }: ContributorInfoProps) {
  return (
    <Link href={NEXT_ROUTER.users.details.root(row.login)} className="flex w-fit items-center gap-2">
      <Avatar>
        <AvatarImage src={row.avatarUrl} alt={row.login} />
        <AvatarFallback>{row.login.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <TypographyP>{row.login}</TypographyP>
      </div>
    </Link>
  );
}
