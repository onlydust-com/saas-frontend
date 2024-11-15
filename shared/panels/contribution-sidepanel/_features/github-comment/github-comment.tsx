import dynamic from "next/dynamic";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { GithubCommentProps } from "@/shared/panels/contribution-sidepanel/_features/github-comment/github-comment.types";

const Emoji = dynamic(() => import("react-emoji-render"));

export function GithubComment({ comment }: GithubCommentProps) {
  if (!comment) return null;

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contribution.githubComment.title" }} />

      <Typo as={"p"} size={"xs"} color={"secondary"}>
        <Emoji>{comment}</Emoji>
      </Typo>
    </Paper>
  );
}
