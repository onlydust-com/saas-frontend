import dynamic from "next/dynamic";

import { Markdown } from "@/shared/features/markdown/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Summary({
  body,
  labels,
  author,
}: {
  body?: string;
  labels?: string[];
  author: { login: string; avatarUrl: string };
}) {
  return (
    <Card className="flex flex-col gap-3 p-3">
      <header className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback className="size-6">{author.login.charAt(0)}</AvatarFallback>
        </Avatar>

        <TypographyP>{author.login}</TypographyP>
      </header>

      {body ? (
        <Emoji>
          <Markdown content={body} />
        </Emoji>
      ) : null}

      <footer>
        {labels ? (
          <ul className="flex flex-wrap items-center gap-2">
            {labels.map(label => (
              <li key={label}>
                <Badge variant="outline">{label}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </footer>
    </Card>
  );
}
