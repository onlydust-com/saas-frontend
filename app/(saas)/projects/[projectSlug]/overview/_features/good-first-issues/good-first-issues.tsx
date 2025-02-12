import { ThumbsUp } from "lucide-react";
import dynamic from "next/dynamic";

import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function GoodFirstIssues() {
  const dateKernel = bootstrap.getDateKernelPort();

  return (
    <Card className={"flex flex-col gap-4 bg-gradient-to-br from-green-950 to-transparent to-50% p-4"}>
      <header className={"flex items-center gap-2"}>
        <ThumbsUp className={"text-green-700"} />
        <TypographyH3>Good First Issues</TypographyH3>
      </header>

      <TypographyP>This project offers Good First Issues, perfect for new contributors.</TypographyP>

      <ul>
        <li>
          <a
            href="https://github.com/org/repo/issues/1"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-opacity hover:opacity-80"
          >
            <Card className={"flex items-center justify-between gap-3 p-3"}>
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge type={"ISSUE"} number={1} githubStatus={"OPEN"} />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>
                    {"🐛 Fix a bug"} Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi maxime in quos qui
                    accusantium, dignissimos at ipsa ipsam fugit quis odit. Mollitia quis dignissimos iure dolor
                    possimus reprehenderit nostrum. Doloremque.
                  </Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-sm"}>{dateKernel.format(new Date(), "dd MMM.")}</TypographyMuted>
            </Card>
          </a>
        </li>
      </ul>

      <div>
        <Button variant={"outline"}>View all Good First Issues (xxx)</Button>
      </div>
    </Card>
  );
}
