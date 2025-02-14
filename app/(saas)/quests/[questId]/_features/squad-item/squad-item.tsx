import Link from "next/link";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyP } from "@/shared/ui/typography";

import { SquadItemProps } from "./squad-item.types";

export function SquadItem({ githubId, skills }: SquadItemProps) {
  const { data } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: String(githubId) },
    options: {
      enabled: Boolean(githubId),
    },
  });

  const { contributor } = data ?? {};

  if (!githubId) {
    return (
      <Card className="flex w-1/6 flex-col gap-4 border-dashed p-4">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <TypographyP className="font-medium">Available slot</TypographyP>
        </div>

        {skills?.length ? (
          <div className="flex flex-wrap gap-1">
            {skills.map(skill => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}
      </Card>
    );
  }

  return (
    <Link href={NEXT_ROUTER.users.details.root(String(contributor?.login))} className="w-1/6">
      <Card className="flex w-full cursor-pointer flex-row items-center gap-2 p-4 hover:bg-muted">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={contributor?.avatarUrl} alt={contributor?.login} />
            <AvatarFallback>{contributor?.login.charAt(0)}</AvatarFallback>
          </Avatar>
          <TypographyP className="font-medium">{contributor?.login}</TypographyP>
        </div>
        {skills?.length ? (
          <div className="flex flex-wrap gap-1">
            {skills.map(skill => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}
      </Card>
    </Link>
  );
}
