import { ThumbsUp } from "lucide-react";
import dynamic from "next/dynamic";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyP } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function GoodFirstIssues() {
  const dateKernel = bootstrap.getDateKernelPort();

  return (
    <Card className={"flex flex-col gap-4 bg-gradient-to-br from-green-900 to-transparent to-50% p-4"}>
      <header className={"flex items-center gap-2"}>
        <ThumbsUp className={"text-green-700"} />
        <TypographyH3>Good First Issues</TypographyH3>
      </header>

      <TypographyP>This project offers Good First Issues, perfect for new contributors.</TypographyP>

      <ul>
        <li>
          <div className={"flex flex-row items-center justify-between gap-2 px-3"}>
            <div className={"flex flex-1 flex-row items-center gap-lg overflow-hidden"}>
              <ContributionBadge type={"ISSUE"} number={1} githubStatus={"OPEN"} />

              <Typo
                size={"sm"}
                weight={"medium"}
                classNames={{
                  base: "overflow-ellipsis overflow-hidden whitespace-nowrap hover:underline hover:underline-offset-2",
                }}
                as={"a"}
                htmlProps={{
                  href: "https://github.com/org/repo/issues/1",
                  target: "_blank",
                }}
              >
                <Emoji>{"🐛 Fix a bug"}</Emoji>
              </Typo>
            </div>

            <div>
              <Typo size={"xs"} color={"secondary"}>
                {dateKernel.format(new Date(), "dd MMM.")}
              </Typo>
            </div>
          </div>
        </li>
      </ul>

      <div>
        <Button variant={"secondary"}>View all Good First Issues (xxx)</Button>
      </div>
    </Card>
  );
}
