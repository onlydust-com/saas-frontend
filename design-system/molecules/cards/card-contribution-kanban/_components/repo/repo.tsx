import { GithubIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { Badge } from "@/design-system/atoms/badge";

import { RepoProps } from "./repo.types";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Repo({ repo }: RepoProps) {
  if (!repo) return null;

  return (
    <Badge size="xxs" shape="squared" variant="outline" icon={{ component: GithubIcon }}>
      <Emoji>{repo.name}</Emoji>
    </Badge>
  );
}
