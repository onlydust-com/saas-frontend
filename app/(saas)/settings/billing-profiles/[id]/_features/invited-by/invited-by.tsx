import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

export function InvitedBy({ login, avatarUrl }: { login?: string; avatarUrl?: string }) {
  if (!login) return null;

  return (
    <div className="flex flex-col items-end">
      <TypographyMuted>Invited by</TypographyMuted>

      <Link href={NEXT_ROUTER.users.details.root(login)} className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={login} />
          <AvatarFallback>{login.charAt(0)}</AvatarFallback>
        </Avatar>

        <TypographyP>{login}</TypographyP>
      </Link>
    </div>
  );
}
