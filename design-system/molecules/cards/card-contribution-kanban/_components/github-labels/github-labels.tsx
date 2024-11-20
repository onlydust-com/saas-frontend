import { Tag } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";

import { GithubLabelsProps } from "./github-labels.types";

export function GithubLabels({ githubLabels }: GithubLabelsProps) {
  if (!githubLabels?.length) return null;

  return githubLabels.map(({ name }) => (
    <Badge key={name} size="xxs" shape="squared" variant="outline" icon={{ component: Tag }}>
      {name}
    </Badge>
  ));
}
